import { styled } from '@mui/material/styles';

export const wrapperDescription = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: { sm: '400px' },
};

export const titleProductStyles = {
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontFamily: 'Oswald, sans-serif',
};
export const ratingStyles = {
  margin: '10px 0',
};

export const priceStyles = {
  color: (theme) => theme.palette.text.primary,
  fontFamily: 'Oswald, sans-serif',
};

export const descriptionStyles = {
  margin: '10px 0',
  color: (theme) => theme.palette.text.secondary,
  fontSize: { xs: '1.3rem', sm: '1.6rem' },
  fontWeight: 300,
};

export const wrapperBtnsStyles = {
  display: 'flex',
  alignItems: 'center',
  margin: '10px 0 20px 0',
};

export const InputNumber = styled('input')(({ theme }) => ({
  width: '40px',
  height: '31px',
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

export const btnStyles = {
  minWidth: '40px',
  padding: '8px 0',
  borderRadius: 'initial',
};

export const wrapperStockStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
};

export const onStockStyles = {
  color: (theme) => theme.palette.text.primary,
  fontSize: { xs: '1.2rem', sm: '1.6rem' },
};

export const bntAddToCartStyles = {
  minWidth: '120px',
  padding: { sm: '10px 0px' },
};
