import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import SnackBarMessage from './SnackBarMessage';

import {
  buttonRedirect,
  boxFormStyles,
  FormMsgSignIn,
  forgetPasswordStyles,
  iconBtnSignInStyles,
  inputEmailStyles,
  inputFormStyles,
  questionTextStyles,
  signInTitleStyles,
  submitButtonStyles,
} from '../muistyles/SignInForm.styles';

import { StoreContext } from '../utils/store';

import { copyCart } from '../helpers/carthelpers';
import { addCart } from '../helpers/client/apiHelpers';

import {
  CREATE_CART,
  CLOSE_DRAWER,
  OPEN_DRAWER,
  SHOW_FORGET_PASSWORD,
  SHOW_SIGN_UP,
  USER_LOGIN_DATA,
} from '../utils/constants';

const SignInForm = () => {
  const router = useRouter();
  const {
    disptachContentDrawer,
    dispatchLoginUser,
    disptachOpenDrawer,
    dispatchCart,
    stateCart,
    stateLoginUser,
  } = useContext(StoreContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const idTimeout = useRef(null);
  const idTimeoutSec = useRef(null);
  const idTimeoutThird = useRef(null);
  const checkCart =
    Boolean(stateCart.products) && stateCart.products.length > 0;

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
    }, 1000);
  };

  const handleCartControl = async (result) => {
    const cartState = copyCart(stateCart, result.user._id);

    const dataCartBase = await addCart(
      `http://localhost:3000/api/v1/cart`,
      cartState,
      result?.tokenAccess,
      setErrorMsg
    );
    dispatchCart({ type: CREATE_CART, data: dataCartBase.data });
    localStorage.removeItem('cart');
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
        if (Boolean(Number(Cookies.get('check')))) {
          handleCartControl(result);
          setTimeout(() => router.push('/shipping'), 1100);
        }
        if (checkCart) handleCartControl(result);
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
        <Box sx={{ position: 'relative', width: '95%' }}>
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
                id="outlined-adornment-password"
                label="Password"
                variant="outlined"
                size="small"
                sx={inputFormStyles}
                type={showPassword ? 'text' : 'password'}
              />
            )}
          />
          <IconButton
            onClick={() => setShowPassword((prevValue) => !prevValue)}
            sx={iconBtnSignInStyles}
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
