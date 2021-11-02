import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
  commentsTitleStyles,
  formReviewStyles,
  reviewTitleStyles,
  wrapperRatingReviewStyles,
} from '../muistyles/ReviewsProduct.styles';

const ReviewsProduct = () => {
  const [review, setReview] = useState('');

  const handleSubmitAddReview = (e) => {
    e.preventDefault();
  };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={(e) => handleSubmitAddReview(e)}
        sx={formReviewStyles}
      >
        <Typography variant="h5" sx={reviewTitleStyles}>
          Write your review
        </Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="Review"
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
          Write review
        </Button>
      </Box>
      <Box>
        <Typography variant="h5" sx={commentsTitleStyles}>
          Reviews (1)
        </Typography>
        <Paper
          variant="outlined"
          square
          component="article"
          sx={{
            position: 'relative',
            padding: '10px',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box
            sx={{
              width: '80px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://cdn.pixabay.com/photo/2021/09/24/22/05/woman-6653634_960_720.jpg"
              sx={{
                width: '40px',
                height: '40px',
                display: { xs: 'none', sm: 'block' },
              }}
            ></Avatar>
          </Box>
          <Box
            sx={{
              width: { xs: 'initial', sm: 'calc(100% - 80px)' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'space-around', sm: 'initial' },
                alignItems: { xs: 'center', sm: 'flex-end' },
                marginBottom: '10px',
                width: { xs: '200px', sm: 'initial' },
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://cdn.pixabay.com/photo/2021/09/24/22/05/woman-6653634_960_720.jpg"
                sx={{
                  width: '40px',
                  height: '40px',
                  display: { xs: 'block', sm: 'none' },
                }}
              ></Avatar>
              <h5 style={{ fontSize: '1.4rem', marginRight: '5px' }}>
                VamosRM
              </h5>
              <Box
                component="span"
                sx={{ color: '#aeaeae', fontSize: '1.2rem' }}
              >
                Today 18:36:32
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: '1.4rem', sm: '1.6rem', fontWeight: 300 } }}
            >
              I would recommend to apply scrollbar styles only for the specific
              container, cause @Global may take rendering time to apply on the
              All elements. This works fine as for me.I would recommend to apply
              scrollbar styles only for the specific container, cause @Global
              may take rendering time to apply on the All elements. This works
              fine as for me I would recommend to apply scrollbar styles only
              for the specific container, cause @Global may take rendering time
              to apply on the All elements. This works fine as for me.I would
              recommend to apply scrollbar styles only for the specific
              container, cause @Global may take rendering time to apply on the
              All elements. This works fine as for me I would recommend to apply
              scrollbar styles only for the specific container, cause @Global
              may take rendering time to apply on the All elements. This works
              fine as for me.I would recommend to apply scrollbar styles only
              for the specific container, cause @Global may take rendering time
              to apply on the All elements. This works fine as for me I would
              recommend to apply scrollbar styles only for the specific
              container, cause @Global may take rendering time to apply on the
              All elements. This works fine as for me.I would recommend to apply
              scrollbar styles only for the specific container, cause @Global
              may take rendering time to apply on the All elements. This works
              fine as for me
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ReviewsProduct;
