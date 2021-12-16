import { styled } from '@mui/material/styles';

export const SectionOrderShip = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  [theme.breakpoints.up('xs')]: {
    padding: '0 16px',
    minHeight: 'calc(100vh - 140.5px)',
  },
  [theme.breakpoints.up('sm')]: {
    padding: '0 24px',
    minHeight: 'calc(100vh - 141px)',
  },
}));

export const FormMsgShipOrder = styled('p')(({}) => ({
  width: '100%',
  fontSize: '1rem',
  color: 'red',
}));

export const formOrderShipStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: { xs: '100%', sm: '50%' },
  marginBottom: '20px',
};

export const inputOrderShipStyles = {
  width: { xs: '100%', sm: '100%' },
  margin: '6px 0',
};

export const inputLastOrderShipStyles = {
  width: { xs: '100%', sm: '100%' },
  margin: '6px 0 20px 0',
};

export const addOrderBtnStyles = {
  width: { xs: '100%', sm: '100%' },
};

export const titleShipppingStyles = {
  marginBottom: '15px',
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontSize: { xs: '1.6rem', sm: '2.1rem' },
  fontWeight: 500,
  fontFamily: 'Oswald, sans-serif',
  letterSpacing: 1,
};
