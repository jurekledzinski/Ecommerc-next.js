export const boxWrapperDeleteUserStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: { xs: '95%', sm: '400px' },
  height: '250px',
  padding: '20px',
  backgroundColor: (theme) => theme.palette.background.paper,
  zIndex: '1',
};

export const titleQuestionDeleteUserStyles = {
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  textAlign: 'center',
  fontFamily: 'Oswald,sans-serif',
  fontWeight: '400',
};

export const boxWrapperBtnsDeleteUserStyles = {
  width: { xs: '80%', sm: '50%' },
  display: 'flex',
  justifyContent: 'space-evenly',
  marginTop: '10px',
};

export const boxBtnDeleteUserStyles = {
  marginBottom: { xs: '15px', sm: 'initial' },
};
