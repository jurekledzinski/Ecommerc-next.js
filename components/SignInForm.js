import React, { useContext, useRef, useState } from 'react';
import { Button, Box, TextField, Typography } from '@mui/material';

import {
  buttonRedirect,
  boxFormStyles,
  forgetPasswordStyles,
  inputEmailStyles,
  inputFormStyles,
  questionTextStyles,
  signInTitleStyles,
  submitButtonStyles,
} from '../muistyles/SignInForm.styles';

import { StoreContext } from '../uitils/store';

import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  SHOW_FORGET_PASSWORD,
  SHOW_SIGN_UP,
} from '../uitils/constants';

const SignInForm = () => {
  const { disptachContentDrawer, disptachOpenDrawer } =
    useContext(StoreContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const idTimeout = useRef(null);
  const idTimeoutSec = useRef(null);

  const handleSubmitForm = (e) => {
    console.log(e.target);
  };

  const handleShowSignUp = () => {
    disptachOpenDrawer({ type: CLOSE_DRAWER });
    idTimeout.current = setTimeout(() => {
      disptachOpenDrawer({ type: OPEN_DRAWER });
      disptachContentDrawer({ type: SHOW_SIGN_UP });
      clearTimeout(idTimeout.current);
    }, 800);
  };

  const handleShowForgetPassword = () => {
    disptachOpenDrawer({ type: CLOSE_DRAWER });

    idTimeoutSec.current = setTimeout(() => {
      disptachOpenDrawer({ type: OPEN_DRAWER });
      disptachContentDrawer({ type: SHOW_FORGET_PASSWORD });
      clearTimeout(idTimeoutSec.current);
    }, 800);
  };

  return (
    <Box>
      <Typography
        id="transition-modal-title"
        variant="h4"
        sx={signInTitleStyles}
      >
        Sign In
      </Typography>
      <Box
        component="form"
        sx={boxFormStyles}
        onSubmit={(e) => handleSubmitForm(e)}
      >
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={inputEmailStyles}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={inputFormStyles}
        />
        <Button variant="contained" size="large" sx={submitButtonStyles}>
          Sign In
        </Button>
      </Box>
      <Typography variant="body1" sx={questionTextStyles}>
        Not registered.
        <Button variant="text" sx={buttonRedirect} onClick={handleShowSignUp}>
          Sign up here
        </Button>
      </Typography>
      <Typography variant="body1" sx={forgetPasswordStyles}>
        Forget password.
        <Button
          variant="text"
          sx={buttonRedirect}
          onClick={handleShowForgetPassword}
        >
          Click here
        </Button>
      </Typography>
    </Box>
  );
};

export default SignInForm;
