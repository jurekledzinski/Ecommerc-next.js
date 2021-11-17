import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
  btnContactSubStyles,
  boxContactStyles,
  contactTitleStyles,
  FormContactMsgStyles,
  inputContactEmailStyles,
  inputContactMsgStyles,
  inputContactNameStyles,
} from '../muistyles/ContactForm.styles';

import { CLOSE_DRAWER } from '../utils/constants';
import { StoreContext } from '../utils/store';

import SnackBarMessage from './SnackBarMessage';

const ContactForm = () => {
  const { disptachOpenDrawer } = useContext(StoreContext);
  const [dataContact, setDataContact] = useState({});
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
      message: '',
      name: '',
    },
  });

  const handleCloseContact = () => {
    idTimeout.current = setTimeout(() => {
      disptachOpenDrawer({ type: CLOSE_DRAWER });
    }, 3000);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/contact', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setDataContact(data);

      if (response.ok) {
        setSuccessMsg(result.msgSuccess);
        handleCloseContact();
      } else {
        setErrorMsg(result.msgError);
      }
    } catch (error) {
      setErrorMsg('Something went wrong! Please try later');
    }
  };

  const errorMessage = (errorMsg) => {
    return <FormContactMsgStyles>{errorMsg}</FormContactMsgStyles>;
  };

  useEffect(() => {
    if (Object.values(dataContact).length >= 3) {
      const defaultValues = {
        email: '',
        message: '',
        name: '',
      };
      reset(defaultValues);
      setDataContact('');
    }
  }, [dataContact, reset]);

  useEffect(() => {
    return () => {
      clearTimeout(idTimeout.current);
    };
  }, []);

  return (
    <Box>
      <Typography
        id="transition-modal-title"
        variant="h4"
        sx={contactTitleStyles}
      >
        Contact
      </Typography>
      <Box
        component="form"
        sx={boxContactStyles}
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
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
              sx={inputContactNameStyles}
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
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              sx={inputContactEmailStyles}
            />
          )}
        />
        {errors.message && errorMessage(errors.message.message)}
        <Controller
          name="message"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Message is required',
            },
            minLength: {
              value: 80,
              message: 'Message require at least eighty characters',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Message"
              multiline
              maxRows={6}
              variant="outlined"
              size="small"
              sx={inputContactMsgStyles}
            />
          )}
        />
        <Button
          variant="contained"
          size="large"
          sx={btnContactSubStyles}
          type="submit"
        >
          Send Message
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;
