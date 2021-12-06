import { styled } from '@mui/material/styles';

export const reviewTitleStyles = {
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontFamily: 'Oswald,sans-serif',
  fontWeight: '500',
};

export const formReviewStyles = {
  display: 'flex',
  flexDirection: 'column',
};

export const wrapperRatingReviewStyles = {
  width: 'fit-content',
  margin: '5px 0',
};

export const FormMsgReview = styled('p')(({}) => ({
  width: '95%',
  fontSize: '1rem',
  color: 'red',
}));

export const FormMsgEditReview = styled('p')(({}) => ({
  width: '95%',
  fontSize: '1rem',
  color: 'red',
}));

export const reviewLockerStyles = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '5px',
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontFamily: 'Oswald,sans-serif',
  fontWeight: '500',
};
