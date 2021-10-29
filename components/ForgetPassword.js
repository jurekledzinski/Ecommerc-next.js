import React, { useState } from 'react';
import { Button, Box, TextField, Typography } from '@mui/material';
import {
  boxStyles,
  boxFormStyles,
  infoTextStyles,
  inputEmailStyles,
  submitButtonStyles,
  titleStyles,
} from '../muistyles/ForgetPassword.styles';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <Box sx={boxStyles}>
      <Typography variant="h4" sx={titleStyles}>
        Forget Password
      </Typography>

      <Box component="form" sx={boxFormStyles} onSubmit={handleSubmitForm}>
        <Typography variant="body2" sx={infoTextStyles}>
          Send email to change password
        </Typography>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={inputEmailStyles}
        />
        <Button variant="contained" size="large" sx={submitButtonStyles}>
          Change password
        </Button>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
