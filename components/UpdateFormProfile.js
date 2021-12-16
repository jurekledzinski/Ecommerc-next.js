import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import SnackBarMessage from './SnackBarMessage';

import {
  FormMsgUpdateProfile,
  formProfileStyles,
  iconBtnUpdateProfileStyles,
  inputConfirmProfileStyles,
  inputProfileStyles,
  updateShipBtnStyles,
} from '../muistyles/UpdateFormProfile.styles';

import { addUpdateProfile } from '../helpers/client/apiHelpers';

import { StoreContext } from '../utils/store';

const UpdateFormProfile = () => {
  const { stateLoginUser, stateUserProfile } = useContext(StoreContext);
  const { tokenAccess } = stateLoginUser;
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords not match',
      });
    }

    const result = await addUpdateProfile(
      '/api/v1/profile',
      data,
      tokenAccess,
      setErrorMsg
    );

    if (Boolean(result?.data)) {
      setSuccessMsg(result.msgSuccess);
    }
  };

  const errorMessage = (errorMsg) => {
    return <FormMsgUpdateProfile>{errorMsg}</FormMsgUpdateProfile>;
  };

  useEffect(() => {
    if (Object.keys(stateUserProfile).length > 0) {
      const defaultValues = {
        name: stateUserProfile.name || '',
        surname: stateUserProfile.surname || '',
        email: stateUserProfile.email || '',
        password: '',
        confirmPassword: '',
      };
      reset(defaultValues);
    }
  }, [stateUserProfile, reset]);

  return (
    <Box
      component="form"
      sx={formProfileStyles}
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
            sx={inputProfileStyles}
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
            sx={inputProfileStyles}
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
            sx={inputProfileStyles}
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
            sx={inputProfileStyles}
          />
        )}
      />
      {errors.confirmPassword && errorMessage(errors.confirmPassword.message)}
      <Box sx={{ position: 'relative', width: '100%' }}>
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
              sx={inputConfirmProfileStyles}
              type={showPassword ? 'text' : 'password'}
            />
          )}
        />
        <IconButton
          onClick={() => setShowPassword((prevValue) => !prevValue)}
          sx={iconBtnUpdateProfileStyles}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </Box>
      <Button
        variant="contained"
        size="large"
        sx={updateShipBtnStyles}
        type="submit"
      >
        Update profile
      </Button>
    </Box>
  );
};

export default UpdateFormProfile;
