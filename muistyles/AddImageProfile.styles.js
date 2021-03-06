import { styled } from '@mui/material/styles';

export const formAddImageStyles = {
  width: '100%',
  margin: '20px 0',
};

export const InputFile = styled('input')({
  display: 'none',
});

export const LabelFileTag = styled('label')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'flex-end',
  margin: '5px 0',
}));

export const FileNameTag = styled('span')(({ theme }) => ({
  width: '50%',
  color: theme.palette.text.primary,
  fontSize: '1.2rem',
  textIndent: '5px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  fontWeight: '300',
}));

export const addProfileImageBtnStyles = {
  width: '100%',
};

export const cardAvatarProfileStyles = {
  position: 'relative',
  maxWidth: '50px',
  margin: '20px 0 0 0',
  borderRadius: 'initial',
};

export const FormMsgAvatarProfile = styled('p')(({}) => ({
  width: '95%',
  fontSize: '1rem',
  color: 'red',
}));

export const loaderImageAvatarProfile = {
  position: 'absolute',
  top: '40%',
  left: '35%',
  transform: 'translate(-50%,-50%)',
};
