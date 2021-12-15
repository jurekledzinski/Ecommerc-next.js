import { styled } from '@mui/material/styles';

export const SectionChangePassword = styled('section')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
}));

export const FormMsgChangePassword = styled('p')(({}) => ({
  width: '95%',
  fontSize: '1rem',
  color: 'red',
}));

export const boxChangeFormStyles = {
  width: { xs: 'calc(100vw - 20vw)', sm: '300px' },
};

export const changePasswordTitleStyles = {
  width: '100%',
  margin: '18px auto 17px auto',
  textTransform: 'uppercase',
  color: (theme) => theme.palette.text.primary,
  letterSpacing: '1px',
  fontSize: { xs: '1.6rem', sm: '2rem' },
  fontWeight: 300,
  fontFamily: 'Oswald, sans-serif',
};

export const formChangePasswordStyles = {
  width: '100%',
};

export const inputFormChangePasswordStyles = {
  width: '95%',
  margin: '6px 0',
};

export const inputConfirmChangePasswordStyles = {
  width: '95%',
  margin: '6px 0 20px 0',
};

export const submitBtnChangePasswordStyles = {
  width: '95%',
};

export const boxNoPermissionWrapperStyles = {
  width: { xs: '80%', sm: 'initial' },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const titleNoPermissionStyles = {
  maxWidth: { xs: '95%', sm: 'initial' },
  color: (theme) => theme.palette.text.primary,
  fontSize: {
    xs: '14px',
    sm: '24px',
  },
  textAlign: { xs: 'center', sm: 'initial' },
  letterSpacing: '1px',
  textTransform: 'uppercase',
  fontWeight: 300,
  fontFamily: 'Oswald, sans-serif',
};

export const btnNoPermissionStyles = {
  minWidth: { xs: '95%', sm: 'initial' },
  maxWidth: { xs: 'initial', sm: '150px' },
  marginTop: '20px',
};
