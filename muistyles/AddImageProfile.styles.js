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
  color: (theme) => theme.palette.text.primary,
  fontSize: '1.2rem',
  textIndent: '5px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}));

export const addProfileImageBtnStyles = {
  width: '100%',
};

export const cardAvatarProfileStyles = {
  maxWidth: '50px',
  margin: '20px 0 0 0',
};

export const FormMsgAvatarProfile = styled('p')(({}) => ({
  width: '95%',
  fontSize: '1rem',
  color: 'red',
}));
