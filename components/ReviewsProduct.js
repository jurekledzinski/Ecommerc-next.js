import React, { useContext, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import {
  commentsTitleStyles,
  reviewNoCommentsStyles,
} from '../muistyles/ReviewsProduct.styles';

import ReviewForm from './ReviewForm';
import EditReviewForm from './EditReviewForm';
import SingleReview from './SingleReview';

import { StoreContext } from '../utils/store';

const ReviewsProduct = () => {
  const { stateReviews, stateLoginUser } = useContext(StoreContext);
  const { user } = stateLoginUser;
  console.log(stateLoginUser, ' ReviewsProduct');

  console.log(stateReviews, 'stateReviews reviews products');

  return (
    <Box>
      <ReviewForm />
      {stateReviews.length > 0 ? (
        <Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5" sx={commentsTitleStyles}>
                Reviews {`(${stateReviews.length})`}
              </Typography>
            </AccordionSummary>
            <SingleReview />
          </Accordion>
        </Box>
      ) : (
        <Typography variant="h5" sx={reviewNoCommentsStyles}>
          No reviews. Write first review{' '}
          {Object.keys(stateLoginUser).length > 0 && user.name}
        </Typography>
      )}
    </Box>
  );
};

export default ReviewsProduct;
