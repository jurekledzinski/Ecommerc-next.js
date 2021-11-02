import { styled } from '@mui/material/styles';

export const Section = styled('section')(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  [theme.breakpoints.up('xs')]: {
    minHeight: 'calc(100vh - 90px)',
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: 'calc(100vh - 139px)',
  },
}));

export const containerDetailsStyles = {
  width: 'initial',
  padding: { xs: '12px', sm: '24px' },
  marginLeft: 'initial',
};

export const leftSideStyles = {
  paddingRight: { sm: '16px' },
  paddingLeft: 'initial !important',
};

export const rightSlideStyles = {
  padding: { sm: '0 16px 16px 16px' },
  paddingLeft: { xs: 'initial !important', sm: '16px' },
};
