import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const SnackBarMessage = ({
  errorMsg,
  successMsg,
  setErrorMsg,
  setSuccessMsg,
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMsg('');
    setSuccessMsg('');
  };
  return (
    <>
      {successMsg && (
        <Snackbar
          open={Boolean(successMsg)}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%', fontSize: '1.4rem' }}
          >
            {successMsg}
          </Alert>
        </Snackbar>
      )}
      {errorMsg && (
        <Snackbar
          open={Boolean(errorMsg)}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%', fontSize: '1.4rem' }}
          >
            {errorMsg}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default SnackBarMessage;
