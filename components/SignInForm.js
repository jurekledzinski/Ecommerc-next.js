import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import SnackBarMessage from './SnackBarMessage';

import {
  buttonRedirect,
  boxFormStyles,
  FormMsgSignIn,
  forgetPasswordStyles,
  inputEmailStyles,
  inputFormStyles,
  questionTextStyles,
  signInTitleStyles,
  submitButtonStyles,
} from '../muistyles/SignInForm.styles';

import { StoreContext } from '../utils/store';

import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  SHOW_FORGET_PASSWORD,
  SHOW_SIGN_UP,
  USER_LOGIN_DATA,
} from '../utils/constants';

const SignInForm = () => {
  const {
    disptachContentDrawer,
    dispatchLoginUser,
    disptachOpenDrawer,
    stateLoginUser,
  } = useContext(StoreContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const idTimeout = useRef(null);
  const idTimeoutSec = useRef(null);
  const idTimeoutThird = useRef(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

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

  const handleCloseSignIn = () => {
    idTimeoutThird.current = setTimeout(() => {
      disptachOpenDrawer({ type: CLOSE_DRAWER });
    }, 3000);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMsg(result.msgSuccess);
        dispatchLoginUser({ type: USER_LOGIN_DATA, data: result });
        handleCloseSignIn();
      } else {
        setErrorMsg(result.msgError);
      }
    } catch (error) {
      setErrorMsg('Something went wrong! Please try later');
    }
  };

  const errorMessage = (errorMsg) => {
    return <FormMsgSignIn>{errorMsg}</FormMsgSignIn>;
  };

  useEffect(() => {
    if (stateLoginUser.tokenAccess) {
      const defaultValues = {
        email: '',
        password: '',
      };
      reset(defaultValues);
    }
  }, [reset, stateLoginUser]);

  useEffect(() => {
    return () => {
      clearTimeout(idTimeoutThird.current);
    };
  }, []);

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
        onSubmit={handleSubmit(onSubmit)}
      >
        <SnackBarMessage
          errorMsg={errorMsg}
          successMsg={successMsg}
          setErrorMsg={setErrorMsg}
          setSuccessMsg={setSuccessMsg}
        />
        {errors.email && errorMessage(errors.email.message)}
        <Controller
          name="email"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Email isn't valid",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              sx={inputEmailStyles}
            />
          )}
        />
        {errors.password && errorMessage(errors.password.message)}
        <Controller
          name="password"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Password is required',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              size="small"
              sx={inputFormStyles}
            />
          )}
        />
        <Button
          variant="contained"
          size="large"
          sx={submitButtonStyles}
          type="submit"
        >
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
