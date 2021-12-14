import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
  FormMsgReview,
  formReviewStyles,
  reviewLockerStyles,
  reviewTitleStyles,
  wrapperRatingReviewStyles,
} from '../muistyles/ReviewForm.styles';

import { addReview } from '../helpers/client/apiHelpers';

import { ADD_REVIEW, UPDATE_RATE_PRODUCT_DETAILS } from '../utils/constants';

import { StoreContext } from '../utils/store';

import SnackBarMessage from './SnackBarMessage';

const ReviewForm = () => {
  const {
    dispatchDetailsProduct,
    dispatchReview,
    stateDetailsProduct,
    stateLoginUser,
    stateReviews,
  } = useContext(StoreContext);
  const { _id } = stateDetailsProduct;
  const { tokenAccess, user } = stateLoginUser;
  const [dataForm, setDataForm] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const isReviewed = useRef(true);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    defaultValues: {
      review: '',
      rating: 0,
    },
  });

  const onSubmit = async (data) => {
    if (!parseFloat(data.rating)) {
      return setError('rating', {
        type: 'manual',
        message: 'Rating is required',
      });
    }

    const dataReview = {
      avatarImage: user.avatar,
      likes: 0,
      likesUsers: [],
      name: user.name,
      rate: data.rating,
      review: data.review,
      productId: _id,
      userId: user._id,
    };

    const result = await addReview(
      `http://localhost:3000/api/v1/reviews?productId=${_id}`,
      dataReview,
      tokenAccess,
      setErrorMsg
    );

    setDataForm(result);

    if (Boolean(result) && result.msgSuccess) {
      setSuccessMsg(result.msgSuccess);
      dispatchReview({ type: ADD_REVIEW, data: result.data });
      dispatchDetailsProduct({
        type: UPDATE_RATE_PRODUCT_DETAILS,
        rate: parseFloat(result.rateProduct),
      });
    }
  };

  const errorMessage = (errorMsg) => {
    return <FormMsgReview>{errorMsg}</FormMsgReview>;
  };

  useEffect(() => {
    if (stateLoginUser.tokenAccess) {
      const defaultValues = {
        review: '',
        rating: 0,
      };
      setDataForm(null);
      reset(defaultValues);
    }
  }, [dataForm, reset, stateLoginUser]);

  return (
    <>
      {tokenAccess ? (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h5" sx={reviewTitleStyles}>
              Write your review
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
              {errors.review && errorMessage(errors.review.message)}
              <Controller
                name="review"
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
                    label="Review"
                    multiline
                    rows={6}
                    sx={{ margin: '5px 0' }}
                  />
                )}
              />
              {errors.rating && errorMessage(errors.rating.message)}
              <Controller
                name="rating"
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
                Write review
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ) : (
        <Typography variant="h5" sx={reviewLockerStyles}>
          <LockIcon /> Please log in to add review
        </Typography>
      )}
    </>
  );
};

export default ReviewForm;
