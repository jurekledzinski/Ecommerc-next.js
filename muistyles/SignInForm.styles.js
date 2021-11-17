import { styled } from '@mui/material/styles';

export const signInTitleStyles = {
  width: '95%',
  margin: '18px auto 17px auto',
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
  width: { xs: 'calc(100vw - 20vw)', sm: '300px' },
};

export const inputEmailStyles = {
  width: '95%',
  margin: '6px 0px',
};

export const inputFormStyles = {
  width: '95%',
  margin: '6px 0 20px 0',
};

export const submitButtonStyles = {
  width: '95%',
};

export const buttonRedirect = {
  minWidth: 'initial',
  padding: 'initial',
  textTransform: 'initial',
};

export const questionTextStyles = {
  width: '94%',
  margin: '10px auto 0 auto',
  lineHeight: 'initial',
};

export const forgetPasswordStyles = {
  width: '94%',
  margin: '2px auto 0 auto',
  lineHeight: 'initial',
};

export const FormMsgSignIn = styled('p')(({}) => ({
  width: '95%',
  fontSize: '1rem',
  color: 'red',
}));
