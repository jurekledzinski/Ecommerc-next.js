import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
  boxChangeFormStyles,
  changePasswordTitleStyles,
  FormMsgChangePassword,
  formChangePasswordStyles,
  inputConfirmChangePasswordStyles,
  inputFormChangePasswordStyles,
  SectionChangePassword,
  submitBtnChangePasswordStyles,
} from '../muistyles/ChangePasswordForm.styles';

import SnackBarMessage from './SnackBarMessage';

import { passwordChange } from '../helpers/client/apiHelpers';

const ChangePasswordForm = ({ urlCode }) => {
  const router = useRouter();
  const [dataForm, setDataForm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const idTimeout = useRef(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    defaultValues: {
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

    const result = await passwordChange(
      `/api/v1/register?tokenAccessChange=${urlCode}`,
      data,
      setErrorMsg
    );

    if (Boolean(result?.msgSuccess)) {
      setSuccessMsg(result.msgSuccess);
      idTimeout.current = setTimeout(() => router.push('/'), 1100);
    }

    setDataForm(data);
  };

  const errorMessage = (errorMsg) => {
    return <FormMsgChangePassword>{errorMsg}</FormMsgChangePassword>;
  };

  useEffect(() => {
    if (dataForm.password) {
      const defaultValues = {
        password: '',
        confirmPassword: '',
      };
      reset(defaultValues);
      setDataForm({});
    }
  }, [dataForm, reset]);

  useEffect(() => {
    return () => clearTimeout(idTimeout.current);
  }, []);

  return (
    <SectionChangePassword>
      <Box sx={boxChangeFormStyles}>
        <Typography
          id="transition-modal-title"
          variant="h4"
          sx={changePasswordTitleStyles}
        >
          Change password
        </Typography>
        <Box
          component="form"
          sx={formChangePasswordStyles}
          onSubmit={handleSubmit(onSubmit)}
        >
          <SnackBarMessage
            errorMsg={errorMsg}
            successMsg={successMsg}
            setErrorMsg={setErrorMsg}
            setSuccessMsg={setSuccessMsg}
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
                id="outlined-basic"
                label="password"
                variant="outlined"
                size="small"
                sx={inputFormChangePasswordStyles}
              />
            )}
          />
          {errors.confirmPassword &&
            errorMessage(errors.confirmPassword.message)}
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
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                size="small"
                sx={inputConfirmChangePasswordStyles}
              />
            )}
          />
          <Button
            variant="contained"
            size="large"
            sx={submitBtnChangePasswordStyles}
            type="submit"
          >
            Change password
          </Button>
        </Box>
      </Box>
    </SectionChangePassword>
  );
};

export default ChangePasswordForm;
