import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import {
  avatarReviewsOneStyles,
  avatarReviewsTwoStyles,
  boxNextToAvatarStyles,
  boxInPaperReviewsStyles,
  boxWrapperAvatarStyles,
  commentsTitleStyles,
  formReviewStyles,
  iconBtnThumbUp,
  nameUserReviewStyles,
  paperReviewsStyles,
  ratesReviewProductOneStyles,
  reviewTitleStyles,
  reviewStyles,
  ThumbUpBadge,
  thumbUpIconStyles,
  timeReviewStyles,
  wrapperRatingReviewStyles,
} from '../muistyles/ReviewsProduct.styles';

const ReviewsProduct = () => {
  const [review, setReview] = useState('');

  const handleSubmitAddReview = (e) => {
    e.preventDefault();
  };

  const handleLikeReview = () => {
    console.log('click thumb up review');
  };

  return (
    <Box>
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
            onSubmit={(e) => handleSubmitAddReview(e)}
            sx={formReviewStyles}
          >
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
        </AccordionDetails>
      </Accordion>
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
          <Paper
            variant="outlined"
            square
            component="article"
            sx={paperReviewsStyles}
          >
            <Box sx={boxInPaperReviewsStyles}>
              <Avatar
                alt="Remy Sharp"
                src="https://cdn.pixabay.com/photo/2021/09/24/22/05/woman-6653634_960_720.jpg"
                sx={avatarReviewsOneStyles}
              ></Avatar>
              <Rating
                name="half-rating"
                defaultValue={3.5}
                precision={0.5}
                size="small"
                sx={ratesReviewProductOneStyles}
                readOnly
              />
            </Box>
            <Box sx={boxNextToAvatarStyles}>
              <Box sx={boxWrapperAvatarStyles}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'flex-start',
                    width: '100%',
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="https://cdn.pixabay.com/photo/2021/09/24/22/05/woman-6653634_960_720.jpg"
                    sx={avatarReviewsTwoStyles}
                  ></Avatar>
                  <Typography style={nameUserReviewStyles}>VamosRM</Typography>
                  <Box component="span" sx={timeReviewStyles}>
                    Today 18:36:32
                  </Box>
                </Box>
              </Box>
              <Rating
                name="half-rating"
                defaultValue={3.5}
                precision={0.5}
                size="small"
                sx={{ display: { xs: 'flex', sm: 'none' }, margin: '5px 0' }}
                readOnly
              />
              <Typography variant="body2" sx={reviewStyles}>
                I would recommend to apply scrollbar styles only for the
                specific container, cause @Global may take rendering time to
                apply on the All elements. This works fine as for me.I would
                recommend to apply scrollbar styles only for the specific
                container, cause @Global may take rendering time to apply on the
                All elements. This works fine as for me I would recommend to
                apply scrollbar styles only for the specific container, cause
                @Global may take rendering time to apply on the All elements.
                This works fine as for me.
              </Typography>
              <IconButton
                aria-label="delete"
                sx={iconBtnThumbUp}
                onClick={handleLikeReview}
              >
                <ThumbUpBadge badgeContent={1} max={99}>
                  <ThumbUpAltIcon sx={thumbUpIconStyles} />
                </ThumbUpBadge>
              </IconButton>
            </Box>
          </Paper>
        </Accordion>
      </Box>
    </Box>
  );
};

export default ReviewsProduct;
