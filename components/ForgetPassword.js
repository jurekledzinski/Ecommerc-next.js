import React, { useEffect, useState } from 'react';
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

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const onSubmit = async (data) => {
    console.log(data);
    setEmail(data);
  };

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

  useEffect(() => {
    if (email) {
      const defaultValues = {
        email: '',
      };
      reset(defaultValues);
      setEmail('');
    }
  }, [email, reset]);

  const errorMessage = (errorMsg) => {
    console.log(errorMsg);
    return <FormForgetMsgStyles>{errorMsg}</FormForgetMsgStyles>;
  };

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
