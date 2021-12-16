import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
  FormMsgEditReview,
  formReviewStyles,
  reviewTitleStyles,
  wrapperRatingReviewStyles,
} from '../muistyles/ReviewForm.styles';

import { updateReview } from '../helpers/client/apiHelpers';

import {
  CLOSE_EDIT_FORM,
  UPDATE_REVIEW,
  UPDATE_RATE_PRODUCT_DETAILS,
} from '../utils/constants';

import { StoreContext } from '../utils/store';

import SnackBarMessage from './SnackBarMessage';

const EditReviewForm = ({ idReview, userId }) => {
  const {
    dispatchEditForm,
    dispatchDetailsProduct,
    dispatchReview,
    stateDetailsProduct,
    stateLoginUser,
    stateReviews,
  } = useContext(StoreContext);
  const { _id } = stateDetailsProduct;
  const { tokenAccess, user } = stateLoginUser;
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const idTimeout = useRef(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    defaultValues: {
      editReview: '',
      editRating: 0,
    },
  });

  const onSubmit = async (data) => {
    if (!parseFloat(data.editRating)) {
      return setError('editRating', {
        type: 'manual',
        message: 'Rating is required',
      });
    }

    const dataEdit = {
      avatarImage: user.avatar,
      editRate: data.editRating,
      editReview: data.editReview,
      name: user.name,
    };

    const result = await updateReview(
      `/api/v1/reviews?idReview=${idReview}&productId=${_id}`,
      dataEdit,
      tokenAccess,
      setErrorMsg
    );

    if (Boolean(result) && result.msgSuccess) {
      dispatchReview({
        type: UPDATE_REVIEW,
        idReview: idReview,
        editRateData: result.data.rate,
        editReviewData: result.data.review,
      });
      dispatchDetailsProduct({
        type: UPDATE_RATE_PRODUCT_DETAILS,
        rate: parseFloat(result.rateProduct),
      });

      setSuccessMsg(result.msgSuccess);
      idTimeout.current = setTimeout(
        () => dispatchEditForm({ type: CLOSE_EDIT_FORM }),
        1000
      );
    }
  };

  const errorMessage = (errorMsg) => {
    return <FormMsgEditReview>{errorMsg}</FormMsgEditReview>;
  };

  const checkUser = () => {
    let foundUser;
    if (Boolean(user)) {
      foundUser = userId === user._id;
    }
    return foundUser ? true : false;
  };

  useEffect(() => {
    if (stateReviews.length > 0) {
      const reviewToEdit = stateReviews.find((item) => item._id === idReview);
      const defaultValues = {
        editReview: reviewToEdit.review || '',
        editRating: parseFloat(reviewToEdit.rate) || 0,
      };
      reset(defaultValues);
    }
  }, [stateReviews, reset]);

  useEffect(() => {
    return () => {
      clearTimeout(idTimeout.current);
    };
  }, []);

  return (
    <>
      {checkUser() && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h5" sx={reviewTitleStyles}>
              Edit your review {user.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={formReviewStyles}
            >
              <SnackBarMessage
                errorMsg={errorMsg}
                successMsg={successMsg}
                setErrorMsg={setErrorMsg}
                setSuccessMsg={setSuccessMsg}
              />
              {errors.editReview && errorMessage(errors.editReview.message)}
              <Controller
                name="editReview"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Review is required',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-multiline-flexible"
                    label="Edit Review"
                    multiline
                    rows={6}
                    sx={{ margin: '5px 0' }}
                  />
                )}
              />
              {errors.editRating && errorMessage(errors.editRating.message)}
              <Controller
                name="editRating"
                control={control}
                render={({ field }) => {
                  let rate = { ...field, value: parseFloat(field.value) };
                  return (
                    <Stack spacing={1} sx={wrapperRatingReviewStyles}>
                      <Rating
                        {...rate}
                        defaultValue={0}
                        precision={0.5}
                        size="large"
                      />
                    </Stack>
                  );
                }}
              />
              <Button variant="contained" size="large" type="submit">
                Edit review
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};
export default EditReviewForm;
