import { styled } from '@mui/material/styles';

export const FormMsgUpdateProfile = styled('p')(({}) => ({
  width: '95%',
  fontSize: '1rem',
  color: 'red',
}));

export const formProfileStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  marginBottom: { xs: '30px', sm: 'initial' },
};

export const inputProfileStyles = {
  width: { xs: '100%', sm: '100%' },
  margin: '6px 0',
};

export const inputConfirmProfileStyles = {
  width: { xs: '100%', sm: '100%' },
  margin: '6px 0 20px 0',
};

export const updateShipBtnStyles = {
  width: '100%',
};

export const iconBtnUpdateProfileStyles = {
  position: 'absolute',
  top: '6px',
  right: '0px',
};
