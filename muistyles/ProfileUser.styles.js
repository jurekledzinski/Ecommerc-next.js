import { styled } from '@mui/material/styles';

export const SectionProfile = styled('section')(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  [theme.breakpoints.up('xs')]: {
    minHeight: 'calc(100vh - 90px)',
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: 'calc(100vh - 139px)',
  },
}));

export const boxProfileWrappperStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: { xs: 'initial', sm: 'space-between' },
  width: '100%',
  padding: { xs: '12px', sm: '24px' },
};

export const boxProfileLeftStyles = {
  width: { xs: '100%', sm: '49%' },
};

export const boxProfileRightStyles = {
  width: { xs: '100%', sm: '49%' },
};

export const titleProfileUpdateStyles = {
  marginBottom: '20px',
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontWeight: 500,
  fontFamily: 'Oswald, sans-serif',
  letterSpacing: 1,
};

export const titleShippingStyles = {
  marginTop: '20px',
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontWeight: 500,
  fontFamily: 'Oswald, sans-serif',
  letterSpacing: 1,
};

export const profileAddressStyles = {
  color: (theme) => theme.palette.text.primary,
  fontSize: { xs: '1.4rem', sm: '1.5rem' },
  fontWeight: 300,
};
