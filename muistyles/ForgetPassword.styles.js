import { styled } from '@mui/material/styles';

export const boxStyles = {
  width: { xs: 'calc(100vw - 20vw)', sm: '300px' },
};

export const titleStyles = {
  width: '95%',
  margin: '18px auto 0 15px',
  textTransform: 'uppercase',
  color: (theme) => theme.palette.text.primary,
  fontSize: { xs: '1.6rem', sm: '2rem' },
  fontWeight: 500,
  fontFamily: 'Oswald, sans-serif',
};

export const boxFormStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '15px',
};

export const infoTextStyles = {
  width: '95%',
  marginTop: '15px',
};

export const inputEmailStyles = {
  width: '95%',
  marginTop: '5px',
};

export const submitButtonStyles = {
  width: '95%',
  marginTop: '10px',
};

export const FormForgetMsgStyles = styled('p')(({}) => ({
  width: '95%',
  fontSize: '1rem',
  color: 'red',
}));
