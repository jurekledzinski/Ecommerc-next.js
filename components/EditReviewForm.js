import React, { useState } from 'react';

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
  formReviewStyles,
  reviewTitleStyles,
  wrapperRatingReviewStyles,
} from '../muistyles/ReviewForm.styles';

const EditReviewForm = () => {
  const [review, setReview] = useState('');

  const handleSubmitAddReview = (e) => {
    e.preventDefault();
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5" sx={reviewTitleStyles}>
          Edit your review John
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="form"
          onSubmit={(e) => handleSubmitAddReview(e)}
          sx={formReviewStyles}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Edit review"
            multiline
            rows={6}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Stack spacing={1} sx={wrapperRatingReviewStyles}>
            <Rating
              name="half-rating"
              defaultValue={0}
              precision={0.5}
              size="large"
            />
          </Stack>
          <Button variant="contained" size="large">
            Edit review
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
export default EditReviewForm;
