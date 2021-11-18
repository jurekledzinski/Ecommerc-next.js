import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import SnackBarMessage from './SnackBarMessage';

import {
  FormMsgShipProfile,
  formProfileShipStyles,
  inputProfileShipStyles,
  inputLastProfileShipStyles,
  addShipBtnStyles,
} from '../muistyles/FormAddShippingAddress.styles';

import { USER_DATA_PROFILE } from '../utils/constants';

import { StoreContext } from '../utils/store';

const FormAddShippingAddress = () => {
  const {
    dispatchLoginUser,
    dispatchUserProfile,
    stateLoginUser,
    stateUserProfile,
  } = useContext(StoreContext);
  const { user } = stateLoginUser;
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    defaultValues: {
      street: '',
      zipCode: '',
      city: '',
      country: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/profile?id=${user._id}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        dispatchUserProfile({ type: USER_DATA_PROFILE, data: result.data });
        setSuccessMsg(result.msgSuccess);
      } else {
        setErrorMsg(result.msgError);
      }
    } catch (error) {
      setErrorMsg('Something went wrong! Please try later');
    }
  };

  const errorMessage = (errorMsg) => {
    return <FormMsgShipProfile>{errorMsg}</FormMsgShipProfile>;
  };

  useEffect(() => {
    if (Object.keys(stateUserProfile).length > 0) {
      console.log('Effect add shipping address');
      const defaultValues = {
        street: stateUserProfile.street,
        zipCode: stateUserProfile.zipCode,
        city: stateUserProfile.city,
        country: stateUserProfile.country,
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
      {errors.zipcode && errorMessage(errors.zipcode.message)}
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
