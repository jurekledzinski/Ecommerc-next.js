import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

export const ThumbUpBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    padding: '0 4px',
    background: 'transparent',
    color: theme.palette.text.primary,
  },
}));

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
  paddingTop: { xs: 'initial', sm: '20px' },
};

export const avatarReviewsOneStyles = {
  display: { xs: 'none', sm: 'flex' },
  width: '40px',
  height: '40px',
  marginBottom: '5px',
};

export const ratesReviewProductOneStyles = {
  display: { xs: 'none', sm: 'flex' },
};

export const boxNextToAvatarStyles = {
  width: { xs: 'initial', sm: 'calc(100% - 80px)' },
  paddingTop: { xs: 'initial', sm: '20px' },
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
  display: { xs: 'flex', sm: 'none' },
  marginBottom: '5px',
};

export const nameUserReviewStyles = {
  fontSize: '1.4rem',
  lineHeight: 1,
  marginRight: '5px',
  paddingTop: { xs: '5px', sm: 'initial' },
};

export const timeReviewStyles = {
  color: '#aeaeae',
  fontSize: '1.2rem',
};

export const reviewStyles = {
  fontSize: '1.4rem',
  fontWeight: 300,
};

export const iconBtnThumbUp = {
  position: 'absolute',
  top: '5px',
  right: '10px',
};

export const thumbUpIconStyles = {
  color: (theme) => theme.palette.text.primary,
  fontSize: { xs: '15px', sm: '15px' },
};

export const wrapperAvatarReviewStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: 'flex-start',
  width: '100%',
};

export const ratingReviewStyles = {
  display: { xs: 'flex', sm: 'none' },
  margin: '5px 0',
};

export const wrapperEditDeleteIconsStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
};
