import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import { commentsTitleStyles } from '../muistyles/ReviewsProduct.styles';

import ReviewForm from './ReviewForm';
import EditReviewForm from './EditReviewForm';
import SingleReview from './SingleReview';

const ReviewsProduct = () => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleShowEditForm = () => {
    console.log('click open edit');
    setShowEditForm((prevValue) => !prevValue);
  };

  return (
    <Box>
      <ReviewForm />
      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h5" sx={commentsTitleStyles}>
              Reviews (1)
            </Typography>
          </AccordionSummary>
          <SingleReview handleShowEditForm={handleShowEditForm} />
          {showEditForm && <EditReviewForm />}
        </Accordion>
      </Box>
    </Box>
  );
};

export default ReviewsProduct;
