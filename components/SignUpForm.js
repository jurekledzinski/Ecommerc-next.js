import React, { useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";

import {
  boxFormStyles,
  buttonRedirect,
  questionTextStyles,
  inputConfirmPasswordStyles,
  inputFormStyles,
  inputNameStyles,
  signUpTitleStyles,
  submitButtonStyles,
} from "../muistyles/SignUpForm.styles";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");

  const handleSubmitForm = (e) => {
    console.log(e.target);
  };

  return (
    <Box>
      <Typography
        id="transition-modal-title"
        variant="h4"
        sx={signUpTitleStyles}
      >
        Sign Up
      </Typography>
      <Box
        component="form"
        sx={boxFormStyles}
        onSubmit={(e) => handleSubmitForm(e)}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={inputNameStyles}
        />
        <TextField
          id="outlined-basic"
          label="Surname"
          variant="outlined"
          size="small"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          sx={inputFormStyles}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={inputFormStyles}
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
        <TextField
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={inputConfirmPasswordStyles}
        />
        <Button variant="contained" size="large" sx={submitButtonStyles}>
          Sign Up
        </Button>
      </Box>
      <Typography variant="body1" sx={questionTextStyles}>
        Already registered.
        <Button variant="text" sx={buttonRedirect}>
          Sign in here
        </Button>
      </Typography>
    </Box>
  );
};

export default SignUpForm;
