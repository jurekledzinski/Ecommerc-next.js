import React, { useState } from 'react';

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

const SingleReview = ({ handleShowEditForm }) => {
  const handleLikeReview = () => {
    console.log('click thumb up review');
  };

  return (
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
          <Box sx={wrapperAvatarReviewStyles}>
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
          sx={ratingReviewStyles}
          readOnly
        />
        <Typography variant="body2" sx={reviewStyles}>
          I would recommend to apply scrollbar styles only for the specific
          container, cause @Global may take rendering time to apply on the All
          elements. This works fine as for me.I would recommend to apply
          scrollbar styles only for the specific container, cause @Global may
          take rendering time to apply on the All elements. This works fine as
          for me I would recommend to apply scrollbar styles only for the
          specific container, cause @Global may take rendering time to apply on
          the All elements. This works fine as for me.
        </Typography>
        <IconButton
          aria-label="thumb"
          sx={iconBtnThumbUp}
          onClick={handleLikeReview}
        >
          <ThumbUpBadge badgeContent={1} max={99}>
            <ThumbUpAltIcon sx={thumbUpIconStyles} />
          </ThumbUpBadge>
        </IconButton>
        <Box sx={wrapperEditDeleteIconsStyles}>
          <IconButton aria-label="edit" onClick={handleShowEditForm}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default SingleReview;
