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

export const containerProductsStyles = {
  padding: (theme) => theme.spacing(3),
};

export const productTitleStyles = {
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontFamily: 'Oswald, sans-serif',
  fontWeight: 500,
};

export const productBoxesStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '250px',
  background: (theme) => theme.palette.background.cardtop,
};

export const cardStyles = {
  height: '350px',
};

export const aTagStyles = {
  textDecoration: 'none',
};

export const cardMediaStyles = {
  objectFit: 'contain',
  width: '200px',
  height: '200px',
};

export const cardContentStyles = {
  height: '100px',
  padding: '5px',
  background: (theme) => theme.palette.background.cardbottom,
};

export const boxWrapper = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: '20px',
};

