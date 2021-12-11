import { styled } from '@mui/material/styles';

export const bowInventoryStyles = {
  width: { xs: '95%', sm: '400px' },
  minHeight: '250px',
  padding: '20px',
  backgroundColor: (theme) => theme.palette.background.paper,
  zIndex: '1',
};

export const mainTitleInventoryStyles = {
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
};

export const subtitleInventoryBoxStyles = {
  color: (theme) => theme.palette.text.primary,
};

export const cardInventoryStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  margin: '10px 0px',
};

export const boxCardMediaInventoryStyles = {
  width: { xs: '50px', sm: '40px' },
  height: { xs: '100px', sm: 'initial' },
  padding: { xs: '15px 5px', sm: '3px 5px' },
};

export const cardMediaInventoryStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
};

export const boxCardContentInventoryStyles = {
  padding: { xs: '0 10px 5px 10px', sm: 'initial' },
};

export const titleCardContentInventoryStyles = {
  textTransform: 'uppercase',
  lineHeight: '1.4',
};

export const FormMsgInvetory = styled('p')(({}) => ({
  width: '95%',
  fontSize: '1rem',
  color: 'red',
}));

export const formControlLabelInventoryStyles = {
  margin: '0px 0px 0px -1px',
  '& .MuiRadio-root': {
    padding: '0px',
  },
  '& > .MuiFormControlLabel-label': {
    textIndent: '3px',
  },
};

export const boxBtnsInventoryWrapperStyles = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: { xs: 'initial', sm: 'space-between' },
};

export const boxApplyChangeInventoryStyles = {
  marginBottom: { xs: '5px', sm: 'initial' },
};
