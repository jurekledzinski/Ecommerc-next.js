import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  boxStyles,
  boxFormStyles,
  FormForgetMsgStyles,
  infoTextStyles,
  inputEmailStyles,
  submitButtonStyles,
  titleStyles,
} from '../muistyles/ForgetPassword.styles';

import { CLOSE_DRAWER } from '../utils/constants';
import { StoreContext } from '../utils/store';

import SnackBarMessage from './SnackBarMessage';

import { sendEmail } from '../helpers/client/apiHelpers';

const ForgetPassword = () => {
  const { disptachOpenDrawer, stateLoginUser } = useContext(StoreContext);
  const { tokenAccess } = stateLoginUser;
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const idTimeout = useRef(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const handleCloseContact = () => {
    idTimeout.current = setTimeout(() => {
      disptachOpenDrawer({ type: CLOSE_DRAWER });
    }, 2000);
  };

  const onSubmit = async (data) => {
    const recoveryData = {
      data: { ...data },
      purpose: 'forgetPassword',
    };

    const result = await sendEmail(
      'http://localhost:3000/api/v1/email',
      recoveryData,
      tokenAccess,
      setErrorMsg
    );

    if (result) {
      setSuccessMsg(result.msgSuccess);
      setEmail(data);
      handleCloseContact();
    }
  };

  const errorMessage = (errorMsg) => {
    return <FormForgetMsgStyles>{errorMsg}</FormForgetMsgStyles>;
  };

  useEffect(() => {
    if (email) {
      const defaultValues = {
        email: '',
      };
      reset(defaultValues);
      setEmail('');
    }
  }, [email, reset]);

  useEffect(() => {
    return () => {
      clearTimeout(idTimeout.current);
    };
  }, []);

  return (
    <Box sx={boxStyles}>
      <Typography variant="h4" sx={titleStyles}>
        Forget Password
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
        <Typography variant="body2" sx={infoTextStyles}>
          Send email to change password
        </Typography>
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
        <Button
          variant="contained"
          size="large"
          sx={submitButtonStyles}
          type="submit"
        >
          Change password
        </Button>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
