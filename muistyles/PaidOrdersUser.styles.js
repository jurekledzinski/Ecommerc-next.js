import { styled } from '@mui/material/styles';

export const SectionPaidOrdersUser = styled('section')(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  [theme.breakpoints.up('xs')]: {
    minHeight: 'calc(100vh - 121px)',
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: 'calc(100vh - 131px)',
  },
}));

export const titlePaidOrdersStyles = {
  margin: { xs: '16px 16px', sm: ' 16px 24px' },
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontFamily: 'Oswald, sans-serif',
  fontWeight: '300',
};

export const boxPaidOrdersWrapperStyles = {
  margin: { xs: '10px 16px', sm: '10px 24px' },
};

export const boxPaidOrderWrapperTitlesStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  width: '100%',
};

export const orderPaidIdTitleStyles = {
  width: { xs: '100%', sm: '50%' },
  fontSize: { xs: '1.2rem', sm: '1.2rem', mxd: '1.4rem' },
  textTransform: 'uppercase',
  fontFamily: 'Oswald, sans-serif',
  fontWeight: 300,
};

export const dateOrderPaidTitleStyles = {
  width: { xs: '100%', sm: '30%' },
  color: 'text.secondary',
  fontSize: { xs: '1.2rem', sm: '1rem', mxd: '1.2rem' },
};

export const deliveredOrderPaidTitleStyles = {
  display: 'flex',
  justifyContent: { xs: 'initial', sm: 'center' },
  alignItems: 'center',
  width: { xs: '100%', sm: '20%' },
  color: 'text.secondary',
  fontSize: { xs: '1.2rem', sm: '1rem', mxd: '1.2rem' },
  '& .MuiSvgIcon-root': {
    fontSize: { xs: '1.2rem', sm: '1rem', mxd: '1.2rem' },
    transform: 'initial',
  },
};

export const iconTickOrdersPaidStyles = {
  marginLeft: '3px',
  color: '#2ecc40',
  transform: 'translateY(-1px)',
};
export const iconNoOrdersPaidStyles = {
  marginLeft: '3px',
  color: '#ff4136',
  transform: 'translateY(-1px)',
};

export const titleShippingOrdersPaidStyles = {
  fontSize: '1.2rem',
  textTransform: 'uppercase',
  fontFamily: 'Oswald, sans-serif',
  fontWeight: '400',
  letterSpacing: '1px',
};

export const boxWrapperContentOrdersPaidStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
};

export const boxLeftRightOrderPaidStyles = {
  width: { xs: '100%', sm: 'calc(50% - 7.5px)' },
};

export const cardOrderPaidStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  width: '100%',
  padding: { xs: '10px 0px 0px 0px', sm: '5px 0px' },
  margin: '7px 0',
};

export const mediaCardOrderPaidStyles = {
  width: { xs: '100%', sm: '50px' },
  height: { xs: '150px', sm: '50px' },
  objectFit: 'contain',
};

export const cardContentWrapperOrderPaidStyles = {
  width: { xs: '100%', sm: 'calc(100% - 50px)' },
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'column', mxd: 'row' },
  justifyContent: { xs: 'initial', sm: 'space-around' },
  alignItems: { mxd: 'center' },
  padding: 'initial',
  '&.MuiCardContent-root:last-child': {
    paddingBottom: 'initial',
  },
};

export const cardContentItemNameOrderPaidStyles = {
  width: { xs: '100%', mxd: '50%' },
  margin: { xs: '5px 0px 0px 5px', sm: '0px', mxd: '0px 0px 0px 5px' },
  fontSize: '1.2rem',
  textTransform: 'uppercase',
  fontFamily: 'Oswald, sans-serif',
  fontWeight: '300',
  letterSpacing: '1px',
};

export const cardContentItemAmountOrderPaidStyles = {
  width: { xs: '100%', mxd: '25%' },
  margin: {
    xs: '20px 0px 0px 5px',
    sm: 'initial',
  },
  fontSize: '1rem',
};

export const cardContentPriceOrderPaidStyles = {
  width: { xs: '100%', mxd: '25%' },
  margin: {
    xs: '3px 0px 0px 5px',
    sm: 'initial',
  },
  paddingBottom: { xs: '10px', sm: 'initial' },
  fontSize: '1rem',
};

export const orderPaidDetailsTextStyles = {
  fontSize: '1.2rem',
  fontWeight: '300',
};

export const titleOrderPaidIconsStyles = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.2rem',
  fontWeight: '300',
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
    transform: 'initial',
  },
};
