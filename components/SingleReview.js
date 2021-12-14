import React, { Fragment, useContext, useState } from 'react';
import { formatDistance } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import {
  avatarReviewsOneStyles,
  avatarReviewsTwoStyles,
  boxInPaperReviewsStyles,
  boxNextToAvatarStyles,
  boxWrapperAvatarStyles,
  iconBtnThumbUp,
  nameUserReviewStyles,
  paperReviewsStyles,
  ratingReviewStyles,
  ratesReviewProductOneStyles,
  reviewStyles,
  timeReviewStyles,
  ThumbUpBadge,
  thumbUpIconStyles,
  wrapperAvatarReviewStyles,
  wrapperEditDeleteIconsStyles,
} from '../muistyles/SingleReview.styles';

import EditReviewForm from './EditReviewForm';

import { deleteReview, updateReview } from '../helpers/client/apiHelpers';

import {
  CLOSE_EDIT_FORM,
  DELETE_REVIEW,
  TOGGLE_EDIT_FORM,
  UPDATE_LIKE_REVIEW,
  UPDATE_RATE_PRODUCT_DETAILS,
} from '../utils/constants';

import { StoreContext } from '../utils/store';

import SnackBarMessage from './SnackBarMessage';

const SingleReview = () => {
  const {
    dispatchReview,
    stateDetailsProduct,
    stateLoginUser,
    stateReviews,
    stateEditForm,
    dispatchDetailsProduct,
    dispatchEditForm,
  } = useContext(StoreContext);
  const { _id } = stateDetailsProduct;
  const { tokenAccess, user } = stateLoginUser;
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLikeReview = async (idReview, numberLikes) => {
    const objUpdate = { likes: numberLikes, userID: Boolean(user) && user._id };

    const result = await updateReview(
      `http://localhost:3000/api/v1/reviews?productId=${_id}&idReview=${idReview}&aim=updateLikes`,
      objUpdate,
      tokenAccess,
      setErrorMsg
    );

    if (Boolean(result) && result.msgSuccess) {
      setSuccessMsg(result.msgSuccess);
      dispatchReview({
        type: UPDATE_LIKE_REVIEW,
        data: result.data.likes,
        idReview: idReview,
      });
    }
  };

  const handleDeleteReview = async (idReview) => {
    const result = await deleteReview(
      `http://localhost:3000/api/v1/reviews?idReview=${idReview}&productId=${_id}`,
      tokenAccess,
      setErrorMsg
    );

    if (Boolean(result) && result.msgSuccess) {
      setSuccessMsg(result.msgSuccess);
      dispatchReview({
        type: DELETE_REVIEW,
        idReview: idReview,
      });
      dispatchDetailsProduct({
        type: UPDATE_RATE_PRODUCT_DETAILS,
        rate: parseFloat(result.rateProduct),
      });
      dispatchEditForm({ type: CLOSE_EDIT_FORM });
    }
  };

  const handleShowEditForm = () => {
    dispatchEditForm({ type: TOGGLE_EDIT_FORM });
  };

  const checkUser = (id) => {
    let foundUser;
    if (Boolean(user)) {
      foundUser = id === user._id;
    }
    return foundUser ? true : false;
  };

  return (
    <>
      {stateReviews.map((item, index) => (
        <Fragment key={index}>
          <Paper
            variant="outlined"
            square
            component="article"
            sx={paperReviewsStyles}
          >
            <SnackBarMessage
              errorMsg={errorMsg}
              successMsg={successMsg}
              setErrorMsg={setErrorMsg}
              setSuccessMsg={setSuccessMsg}
            />
            <Box sx={boxInPaperReviewsStyles}>
              <Avatar
                alt={item.name}
                src={item.avatarImage}
                sx={avatarReviewsOneStyles}
              ></Avatar>
              <Rating
                name="simple-controlled"
                value={parseFloat(item.rate)}
                precision={0.5}
                size="small"
                sx={ratesReviewProductOneStyles}
                readOnly
              />
            </Box>
            <Box sx={boxNextToAvatarStyles}>
              <Box sx={boxWrapperAvatarStyles}>
                <Box sx={wrapperAvatarReviewStyles}>
                  <Avatar
                    alt={item.name}
                    src={item.avatarImage}
                    sx={avatarReviewsTwoStyles}
                  ></Avatar>
                  <Typography style={nameUserReviewStyles}>
                    {item.name}
                  </Typography>
                  <Box component="span" sx={timeReviewStyles}>
                    {formatDistance(new Date(), new Date(item.updatedAt), {
                      includeSeconds: true,
                    })}{' '}
                    ago
                  </Box>
                </Box>
              </Box>
              <Rating
                name="half-rating"
                value={parseFloat(item.rate)}
                precision={0.5}
                size="small"
                sx={ratingReviewStyles}
                readOnly
              />
              <Typography variant="body2" sx={reviewStyles}>
                {item.review}
              </Typography>
              <IconButton
                aria-label="thumb"
                sx={iconBtnThumbUp}
                onClick={() => handleLikeReview(item._id, item.likes)}
              >
                <ThumbUpBadge badgeContent={item.likes} max={99}>
                  <ThumbUpAltIcon sx={thumbUpIconStyles} />
                </ThumbUpBadge>
              </IconButton>
              {checkUser(item.userId) && (
                <Box sx={wrapperEditDeleteIconsStyles}>
                  <IconButton aria-label="edit" onClick={handleShowEditForm}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteReview(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Paper>
          {stateEditForm.editForm && (
            <EditReviewForm userId={item.userId} idReview={item._id} />
          )}
        </Fragment>
      ))}
    </>
  );
};

export default SingleReview;
