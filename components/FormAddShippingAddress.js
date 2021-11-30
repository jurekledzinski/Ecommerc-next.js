import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import SnackBarMessage from './SnackBarMessage';

import {
  FormMsgShipProfile,
  formProfileShipStyles,
  inputProfileShipStyles,
  inputLastProfileShipStyles,
  addShipBtnStyles,
} from '../muistyles/FormAddShippingAddress.styles';

import { addUpdateProfile } from '../helpers/client/apiHelpers';

import { USER_DATA_PROFILE } from '../utils/constants';

import { StoreContext } from '../utils/store';

const FormAddShippingAddress = () => {
  const {
    dispatchLoginUser,
    dispatchUserProfile,
    stateLoginUser,
    stateUserProfile,
  } = useContext(StoreContext);
  const { tokenAccess } = stateLoginUser;
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      street: '',
      zipCode: '',
      city: '',
      country: '',
    },
  });

  const onSubmit = async (data) => {
    const result = await addUpdateProfile(
      'http://localhost:3000/api/v1/profile',
      data,
      tokenAccess,
      setErrorMsg
    );

    if (Boolean(result?.data)) {
      dispatchUserProfile({ type: USER_DATA_PROFILE, data: result.data });
      setSuccessMsg(result.msgSuccess);
    }
  };

  const errorMessage = (errorMsg) => {
    return <FormMsgShipProfile>{errorMsg}</FormMsgShipProfile>;
  };

  useEffect(() => {
    if (Object.keys(stateUserProfile).length > 0) {
      const defaultValues = {
        street: stateUserProfile.street || '',
        zipCode: stateUserProfile.zipCode || '',
        city: stateUserProfile.city || '',
        country: stateUserProfile.country || '',
      };
      reset(defaultValues);
    }
  }, [stateUserProfile, reset]);

  return (
    <Box
      component="form"
      sx={formProfileShipStyles}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SnackBarMessage
        errorMsg={errorMsg}
        successMsg={successMsg}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
      {errors.street && errorMessage(errors.street.message)}
      <Controller
        name="street"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Street is required',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-basic"
            label="Street"
            variant="outlined"
            size="small"
            sx={inputProfileShipStyles}
          />
        )}
      />
      {errors.zipCode && errorMessage(errors.zipCode.message)}
      <Controller
        name="zipCode"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Post code is required',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-basic"
            label="Post code"
            variant="outlined"
            size="small"
            sx={inputProfileShipStyles}
          />
        )}
      />
      {errors.city && errorMessage(errors.city.message)}
      <Controller
        name="city"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'City is required',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-basic"
            label="City"
            variant="outlined"
            size="small"
            sx={inputProfileShipStyles}
          />
        )}
      />
      {errors.country && errorMessage(errors.country.message)}
      <Controller
        name="country"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Country is required',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-basic"
            label="Country"
            variant="outlined"
            size="small"
            sx={inputLastProfileShipStyles}
          />
        )}
      />
      <Button
        variant="contained"
        size="large"
        sx={addShipBtnStyles}
        type="submit"
      >
        {`${stateUserProfile.city ? 'Update' : 'Add'} Shipping address`}
      </Button>
    </Box>
  );
};

export default FormAddShippingAddress;
