import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {
  boxFormStyles,
  buttonRedirect,
  FormMsgSignUp,
  questionTextStyles,
  iconBtnSignUpStyles,
  inputConfirmPasswordStyles,
  inputFormStyles,
  inputNameStyles,
  signUpTitleStyles,
  submitButtonStyles,
} from '../muistyles/SignUpForm.styles';

import SnackBarMessage from './SnackBarMessage';

import { CLOSE_DRAWER, OPEN_DRAWER, SHOW_SIGN_IN } from '../utils/constants';

import { StoreContext } from '../utils/store';

import { createCart } from '../helpers/client/apiHelpers';

const SignUpForm = () => {
  const { disptachContentDrawer, disptachOpenDrawer } =
    useContext(StoreContext);
  const [dataForm, setDataForm] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const idTimeout = useRef(null);
  const idTimeoutSec = useRef(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleShowSignInForm = () => {
    disptachOpenDrawer({ type: CLOSE_DRAWER });
    idTimeout.current = setTimeout(() => {
      disptachOpenDrawer({ type: OPEN_DRAWER });
      disptachContentDrawer({ type: SHOW_SIGN_IN });
      clearTimeout(idTimeout.current);
    }, 800);
  };

  const handleCloseSignUp = () => {
    idTimeoutSec.current = setTimeout(() => {
      disptachOpenDrawer({ type: CLOSE_DRAWER });
    }, 2000);
  };

  const createCartUser = async (userID) => {
    const defaultCart = {
      products: [],
      totalCartAmount: 0,
      totalCartPrice: 0,
      idUser: userID,
    };

    await createCart(
      `http://localhost:3000/api/v1/cart`,
      defaultCart,
      setErrorMsg
    );
  };

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords not match',
      });
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMsg(result.msgSuccess);
        createCartUser(result.data);
        handleCloseSignUp();
      } else {
        setErrorMsg(result.msgError);
      }
      setDataForm(data);
    } catch (error) {
      setErrorMsg('Something went wrong! Please try later');
    }
  };

  const errorMessage = (errorMsg) => {
    return <FormMsgSignUp>{errorMsg}</FormMsgSignUp>;
  };

  useEffect(() => {
    if (dataForm.name) {
      const defaultValues = {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
      reset(defaultValues);
      setDataForm({});
    }
  }, [dataForm, reset]);

  useEffect(() => {
    return () => {
      clearTimeout(idTimeoutSec.current);
    };
  }, []);

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
        onSubmit={handleSubmit(onSubmit)}
      >
        <SnackBarMessage
          errorMsg={errorMsg}
          successMsg={successMsg}
          setErrorMsg={setErrorMsg}
          setSuccessMsg={setSuccessMsg}
        />
        {errors.name && errorMessage(errors.name.message)}
        <Controller
          name="name"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Name is required',
            },
            minLength: {
              value: 2,
              message: 'Name require at least two characters',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic-1"
              label="Name"
              variant="outlined"
              size="small"
              sx={inputNameStyles}
            />
          )}
        />
        {errors.surname && errorMessage(errors.surname.message)}
        <Controller
          name="surname"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Surname is required',
            },
            minLength: {
              value: 2,
              message: 'Surname require at least two characters',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic-2"
              label="Surname"
              variant="outlined"
              size="small"
              sx={inputFormStyles}
            />
          )}
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
              id="outlined-basic-3"
              label="Email"
              variant="outlined"
              size="small"
              sx={inputFormStyles}
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
            minLength: {
              value: 8,
              message: 'Password require at least 8 characters',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic-4"
              label="password"
              variant="outlined"
              size="small"
              sx={inputFormStyles}
            />
          )}
        />
        {errors.confirmPassword && errorMessage(errors.confirmPassword.message)}
        <Box sx={{ position: 'relative', width: '95%' }}>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Confirm password is required',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-adornment-password"
                label="Confirm Password"
                variant="outlined"
                size="small"
                sx={inputConfirmPasswordStyles}
                type={showPassword ? 'text' : 'password'}
              />
            )}
          />
          <IconButton
            onClick={() => setShowPassword((prevValue) => !prevValue)}
            sx={iconBtnSignUpStyles}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>
        <Button
          variant="contained"
          size="large"
          sx={submitButtonStyles}
          type="submit"
        >
          Sign Up
        </Button>
      </Box>
      <Typography variant="body1" sx={questionTextStyles}>
        Already registered.
        <Button
          variant="text"
          sx={buttonRedirect}
          onClick={handleShowSignInForm}
        >
          Sign in here
        </Button>
      </Typography>
    </Box>
  );
};

export default SignUpForm;
