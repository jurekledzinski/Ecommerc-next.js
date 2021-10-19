import React, { useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";

import {
  buttonRedirect,
  boxFormStyles,
  inputEmailStyles,
  inputFormStyles,
  questionTextStyles,
  signInTitleStyles,
  submitButtonStyles,
} from "../muistyles/SignInForm.styles";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = (e) => {
    console.log(e.target);
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
        <Button variant="text" sx={buttonRedirect}>
          Sign up here
        </Button>
      </Typography>
    </Box>
  );
};

export default SignInForm;
