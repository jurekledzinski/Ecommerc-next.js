import { styled } from '@mui/material/styles';

export const SectionDetailsOrder = styled('section')(({ theme }) => ({
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

export const detailsOrderBoxLeft = {
  width: { xs: '100%', sm: '75%' },
};

export const detailsOrderBoxRight = {
  width: { xs: '100%', sm: '25%' },
  marginBottom: { xs: '10px', sm: 'initial' },
};

export const titleDetailsOrderStyles = {
  marginBottom: '10px',
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontSize: { xs: '1.6rem', sm: '2.1rem' },
  fontWeight: 500,
  fontFamily: 'Oswald, sans-serif',
  letterSpacing: 1,
};

export const boxCardsDetailsWrapper = {
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

export const btnDetailsMethodsyStyles = {
  minWidth: { xs: '32%', sm: '130px' },
  borderRadius: 'initial',
};

export const detailsCardStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sxm: 'row' },
  alignItems: { xs: 'intial', sxm: 'center' },
  margin: '10px 0',
};

export const detailsCardMediaStyles = {
  maxWidth: { xs: '100%', sxm: '50px' },
  minHeight: { xs: '200px', sxm: '50px' },
  paddingLeft: { xs: 'initial', sxm: '3px' },
  objectFit: 'contain',
};

export const detailsCardContentStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sxm: 'row' },
  alignItems: { xs: 'intial', sxm: 'flex-end' },
  justifyContent: { xs: 'intial', sxm: 'space-around' },
  width: { xs: '100%', sxm: 'calc(100% - 50px)' },
};

export const detailsCardContentTextStyles = {
  fontSize: '1.2rem',
  fontWeight: '300',
};

export const detailsSummarySubTextStyles = {
  color: (theme) => theme.palette.text.primary,
  fontSize: '1.6rem',
  fontWeight: '300',
  fontFamily: 'Oswald, sans-serif',
  letterSpacing: '1px',
};

export const detailsSummaryBtnStyles = {
  minWidth: '100%',
  marginTop: '20px',
  borderRadius: 'initial',
  lineHeight: { xs: '2.5', sm: '1.75' },
};

export const shippingAddressTextDetails = {
  color: (theme) => theme.palette.text.primary,
  fontSize: { xs: '1.3rem', sm: '1.4rem' },
};

export const titleDetailsOrderShipStyles = {
  margin: '10px 0',
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontSize: { xs: '1.6rem', sm: '2.1rem' },
  fontWeight: 500,
  fontFamily: 'Oswald, sans-serif',
  letterSpacing: 1,
};

export const FormMsgErrorConfrim = styled('p')(({}) => ({
  width: '100%',
  marginTop: '12px',
  fontSize: '1rem',
  color: 'red',
}));

export const labelDetailsOrderStyles = {
  color: (theme) => theme.palette.text.primary,
};
