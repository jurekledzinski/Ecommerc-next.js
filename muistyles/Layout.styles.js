import { styled } from '@mui/material/styles';

export const layoutContainerStyles = {
  maxWidth: '1200px',
  minHeight: { xs: '0vh', sm: 'calc(100vh - 546px)' },
  backgroundColor: (theme) => theme.palette.background.paper,
};

export const Image = styled('img')(({ theme }) => ({
  minWidth: '100%',
}));

export const wrapperTitleStyles = {
  maxWidth: '1200px',
  padding: '20px 0 20px 24px',
  margin: '0 auto',
  backgroundColor: (theme) => theme.palette.background.paper,
};

export const titleProductsStyles = {
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontWeight: 500,
  fontFamily: 'Oswald, sans-serif',
  letterSpacing: 1,
};

export const wrapperButtonsStyles = {
  margin: '0 auto',
  maxWidth: { xs: '100%', sm: '1200px' },
  paddingLeft: { xs: '20px', sm: '24px' },
  backgroundColor: (theme) => theme.palette.background.paper,
};

export const buttonGroupStyles = {
  minWidth: { xs: 'initial', sm: 'initial' },
  width: { xs: 'calc(100% - 16px)', sm: 'initial' },
};

export const buttonProductStyles = {
  width: { xs: '33.3%', sm: 'initial' },
};
