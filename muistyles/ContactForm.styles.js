import { styled } from '@mui/material/styles';

export const contactTitleStyles = {
  width: '95%',
  margin: '18px auto 17px auto',
  textTransform: 'uppercase',
  color: (theme) => theme.palette.text.primary,
  fontSize: { xs: '1.6rem', sm: '2rem' },
  fontWeight: 500,
  fontFamily: 'Oswald, sans-serif',
};

export const boxContactStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: { xs: 'calc(100vw - 20vw)', sm: '300px' },
};

export const inputContactNameStyles = {
  width: '95%',
  margin: '6px 0',
};

export const inputContactEmailStyles = {
  width: '95%',
  margin: '6px 0px',
};

export const inputContactMsgStyles = {
  width: '95%',
  margin: '6px 0px',
  '& .MuiOutlinedInput-input': {
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgb(240, 239, 239)',
  },
  '& .MuiOutlinedInput-input::-webkit-scrollbar': {
    width: '3px',
    height: '3px',
  },
  '& .MuiOutlinedInput-input::-webkit-scrollbar-track': {
    backgroundColor: 'rgb(240, 239, 239)',
  },
  '& .MuiOutlinedInput-input::-webkit-scrollbar-track': {
    backgroundColor: '#bdb6b6',
    borderRadius: '3px',
  },
};

export const btnContactSubStyles = {
  width: '95%',
  marginTop: '20px',
};

export const FormContactMsgStyles = styled('p')(({ theme }) => ({
  width: '95%',
  fontSize: '1rem',
  color: 'red',
}));
