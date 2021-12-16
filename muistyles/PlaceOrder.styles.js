import { styled } from '@mui/material/styles';

export const SectionPlaceOrderShip = styled('section')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '1200px',
  margin: '20px auto 0 auto',
  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
    padding: '0 16px',
    minHeight: 'calc(100vh - 161px)',
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    padding: '0 24px',
    minHeight: 'calc(100vh - 161px)',
  },
}));

export const placeOrderBoxLeft = {
  width: { xs: '100%', sm: '75%' },
};

export const placeOrderBoxRight = {
  width: { xs: '100%', sm: '25%' },
  marginBottom: { xs: '10px', sm: 'initial' },
};

export const titlePlaceOrderStyles = {
  marginBottom: '10px',
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontSize: { xs: '1.6rem', sm: '2.1rem' },
  fontWeight: 500,
  fontFamily: 'Oswald, sans-serif',
  letterSpacing: '1px',
};

export const boxCardsWrapper = {
  maxHeight: { xs: '630px', sm: '300px' },
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgb(240, 239, 239)',
  margin: '10px 0',
  '&::-webkit-scrollbar': {
    width: '3px',
    height: '3px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#bdb6b6',
    borderRadius: '3px',
  },
};

export const btnPaymentStyles = {
  padding: '7px 0px',
  minWidth: { xs: '32%', sm: '130px' },
  borderRadius: 'initial',
};

export const boxBtnsDeliveryStyles = {
  margin: '10px 0',
  width: { xs: '100%', sm: '500px' },
  display: 'flex',
  justifyContent: { xs: 'space-between', sm: 'initial' },
};

export const btnsDeliveryStyles = {
  padding: '7px 0px',
  minWidth: { xs: '32%', sm: '130px' },
  borderRadius: 'initial',
  marginRight: { xs: '0', sm: '1%' },
};

export const cardDeliveryStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sxm: 'row' },
  alignItems: { xs: 'intial', sxm: 'center' },
  margin: '10px 0',
};

export const cardMediaDeliveryStyles = {
  maxWidth: { xs: '100%', sxm: '50px' },
  minHeight: { xs: '200px', sxm: '50px' },
  paddingLeft: { xs: 'initial', sxm: '3px' },
  objectFit: 'contain',
};

export const cardContentDeliveryStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sxm: 'row' },
  alignItems: { xs: 'intial', sxm: 'flex-end' },
  justifyContent: { xs: 'intial', sxm: 'space-around' },
  width: { xs: '100%', sxm: 'calc(100% - 50px)' },
};

export const cardContentTextStyles = { fontSize: '1.2rem', fontWeight: '300' };

export const summaryPlaceOrderTextStyles = {
  color: (theme) => theme.palette.text.primary,
  fontSize: '1.6rem',
  fontWeight: '300',
  fontFamily: 'Oswald, sans-serif',
  letterSpacing: '1px',
};

export const btnPlaceOrderStyles = {
  minWidth: '100%',
  marginTop: '20px',
  borderRadius: 'initial',
  lineHeight: { xs: '2.5', sm: '1.75' },
};

export const shippingAddressText = {
  color: (theme) => theme.palette.text.primary,
  fontSize: { xs: '1.3rem', sm: '1.4rem' },
};

export const FormMsgPlaceOrder = styled('p')(({}) => ({
  width: '100%',
  fontSize: '1rem',
  color: 'red',
}));
