import { styled } from '@mui/material/styles';

export const Section = styled('section')(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    width: 'calc(100vw - 20vw)',
  },
  [theme.breakpoints.up('sm')]: {
    width: '300px',
  },
}));

export const boxTitleStyles = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const cartTitleStyles = {
  width: '95%',
  margin: { xs: '22px auto 0 15px', sm: '18px auto 0 15px' },
  textTransform: 'uppercase',
  color: (theme) => theme.palette.text.primary,
  fontSize: { xs: '1.6rem', sm: '2rem' },
  fontWeight: 500,
  fontFamily: 'Oswald, sans-serif',
};

export const itemsTitleStyles = {
  textAlign: 'right',
  width: '95%',
  margin: '23px 15px 0 auto',
  textTransform: 'uppercase',
  color: (theme) => theme.palette.text.primary,
  fontSize: { xs: '1.4rem', sm: '1.6rem' },
  fontWeight: 500,
  fontFamily: 'Oswald, sans-serif',
};

export const dividerStyles = {
  marginTop: '15px',
};

export const cardStyles = {
  height: '80px',
  boxShadow: 'initial',
  backgroundColor: 'transparent',
  backgroundImage: 'initial',
};

export const cardStylesTwo = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '80px',
  boxShadow: 'initial',
  backgroundColor: 'transparent',
  backgroundImage: 'initial',
};

export const cardStylesThree = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80px',
  boxShadow: 'initial',
};

export const subtitleStyles = {
  textAlign: 'center',
};

export const gridContainerOneStyles = {
  padding: '16px 16px 0 16px',
};

export const cardMediaStyles = {
  marginTop: '5px',
  objectFit: 'contain',
};

export const cardContentStyles = {
  padding: '2px',
  paddingBottom: '0px',
};

export const InputNumber = styled('input')(({ theme }) => ({
  width: '100%',
  height: '30px',
  marginTop: '10px',
  border: '1px solid #eeeeee',
  outline: 'none',
  textAlign: 'center',
  '&::-webkit-inner-spin-button': {
    margin: 0,
    WebkitAppearance: 'none',
  },
  '&::-webkit-outer-spin-button': {
    margin: 0,
    WebkitAppearance: 'none',
  },
  MozAppearance: 'textfield',
}));

export const boxButtonsStyles = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};

export const btnControlQtyStyles = {
  minWidth: 'initial',
  width: '50%',
  padding: '5px',
  borderRadius: 'initial',
};

export const cardTypographyStyles = { textAlign: 'center' };

export const btnRemoveStyles = {
  display: 'block',
  width: '90%',
  margin: '0 auto',
};

export const gridContainerTwoStyles = {
  padding: '16px',
};

export const itemsCartWrapperStyles = {
  maxHeight: '476px',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgb(240, 239, 239)',
  '&::-webkit-scrollbar': {
    width: '3px',
    height: '3px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgb(240, 239, 239)',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#bdb6b6',
    borderRadius: '3px',
  },
};

export const titleCartSummaryStyles = {
  width: 'calc(100% - 32px)',
  margin: '30px auto',
  textTransform: 'Uppercase',
  letterSpacing: '1px',
  fontFamily: 'Oswald, sans-serif',
};

export const buttonCheckoutCartStyles = {
  display: 'block',
  width: 'calc(100% - 32px)',
  padding: '12px 16px',
  margin: '30px auto 30px auto',
};
