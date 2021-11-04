import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

export const formReviewStyles = {
  display: 'flex',
  flexDirection: 'column',
};

export const reviewTitleStyles = {
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontFamily: 'Oswald,sans-serif',
  fontWeight: '500',
};

export const wrapperRatingReviewStyles = {
  width: 'fit-content',
  margin: '10px 0',
};

export const commentsTitleStyles = {
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontFamily: 'Oswald,sans-serif',
  fontWeight: '500',
};

export const ThumbUpBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    padding: '0 4px',
    background: 'transparent',
    color: theme.palette.primary.dark,
  },
}));

export const thumbUpIconStyles = {
  color: (theme) => theme.palette.text.primary,
  fontSize: { xs: '15px', sm: '15px' },
};

export const paperReviewsStyles = {
  position: 'relative',
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  padding: '10px',
  margin: '8px 16px 16px',
};

export const boxInPaperReviewsStyles = {
  width: '80px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

export const avatarReviewsOneStyles = {
  display: { xs: 'none', sm: 'block' },
  width: '40px',
  height: '40px',
  marginBottom: '5px',
};

export const boxNextToAvatarStyles = {
  width: { xs: 'initial', sm: 'calc(100% - 80px)' },
};

export const boxWrapperAvatarStyles = {
  display: 'flex',
  justifyContent: { xs: 'space-around', sm: 'initial' },
  alignItems: { xs: 'center', sm: 'flex-end' },
  marginBottom: '10px',
  width: { xs: '200px', sm: 'initial' },
  position: 'relative',
};

export const avatarReviewsTwoStyles = {
  width: '40px',
  height: '40px',
  display: { xs: 'block', sm: 'none' },
};

export const nameUserReviewStyles = {
  fontSize: '1.4rem',
  marginRight: '5px',
  lineHeight: 1,
};

export const timeReviewStyles = {
  color: '#aeaeae',
  fontSize: '1.2rem',
};

export const reviewStyles = {
  fontSize: { xs: '1.4rem', sm: '1.6rem', fontWeight: 300 },
};

export const iconBtnThumbUp = {
  position: 'absolute',
  top: '5px',
  right: '5px',
};

export const ratesReviewProductOneStyles = {
  display: { xs: 'none', sm: 'flex' },
};
