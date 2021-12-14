import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import SnackBarMessage from './SnackBarMessage';

import { ADD_STEP_STEPPER } from '../utils/constants';

import { StoreContext } from '../utils/store';

import {
  addOrderBtnStyles,
  FormMsgShipOrder,
  formOrderShipStyles,
  inputOrderShipStyles,
  inputLastOrderShipStyles,
  SectionOrderShip,
  titleShipppingStyles,
} from '../muistyles/OrderShippingForm.styles';

import { addOrderDetails, getProfile } from '../helpers/client/apiHelpers';

const OrderShippingForm = () => {
  const router = useRouter();
  const { dispatchStepper, stateCart, stateLoginUser, stateUserProfile } =
    useContext(StoreContext);
  const { tokenAccess, user } = stateLoginUser;
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [profileData, setProfileData] = useState({});
  const idTimeout = useRef(null);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      street: '',
      zipCode: '',
      city: '',
      country: '',
    },
  });

  const handelRedirect = () => {
    idTimeout.current = setTimeout(() => {
      router.push('/shipping/place-order');
      Cookies.set('step', '2');
      dispatchStepper({
        type: ADD_STEP_STEPPER,
        data: Cookies.get('step'),
      });
    }, 1100);
  };

  const onSubmit = async (data) => {
    const shipData = {
      ...data,
      cart: stateCart,
      email: profileData.email,
      idUser: user._id,
      orderId: uuid(),
    };

    const result = await addOrderDetails(
      `http://localhost:3000/api/v1/order?page=Shipping_address`,
      shipData,
      tokenAccess,
      setErrorMsg
    );

    if (result?.msgSuccess) {
      setSuccessMsg(result.msgSuccess);
      handelRedirect();
    }
  };

  const errorMessage = (errorMsg) => {
    return <FormMsgShipOrder>{errorMsg}</FormMsgShipOrder>;
  };

  useEffect(() => {
    if (stateLoginUser?.tokenAccess) {
      const fetchProfile = async () => {
        const result = await getProfile(
          'http://localhost:3000/api/v1/profile',
          stateLoginUser.tokenAccess,
          setErrorMsg
        );

        if (result?.userData) {
          const { userData } = result;
          setProfileData(userData);
        }
      };

      fetchProfile();
    }
  }, [stateLoginUser]);

  useEffect(() => {
    if (Object.keys(profileData).length > 0) {
      const defaultValues = {
        name: profileData.name,
        surname: profileData.surname,
        street: profileData.street || '',
        zipCode: profileData?.zipCode || '',
        city: profileData.city || '',
        country: profileData.country || '',
      };
      reset(defaultValues);
    }
  }, [profileData, reset]);

  useEffect(() => {
    Cookies.set('step', '1');
    dispatchStepper({
      type: ADD_STEP_STEPPER,
      data: Cookies.get('step'),
    });
    return () => clearTimeout(idTimeout.current);
  }, []);

  return (
    <SectionOrderShip>
      <Box
        component="form"
        sx={formOrderShipStyles}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h4" sx={titleShipppingStyles}>
          Shipping address
        </Typography>
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
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
              sx={inputOrderShipStyles}
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
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Surname"
              variant="outlined"
              size="small"
              sx={inputOrderShipStyles}
            />
          )}
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
              sx={inputOrderShipStyles}
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
              sx={inputOrderShipStyles}
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
              sx={inputOrderShipStyles}
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
              sx={inputLastOrderShipStyles}
            />
          )}
        />
        <Button
          variant="contained"
          size="large"
          sx={addOrderBtnStyles}
          type="submit"
        >
          {`${stateUserProfile.city ? 'Update' : 'Add'} Shipping address`}
        </Button>
      </Box>
    </SectionOrderShip>
  );
};

export default OrderShippingForm;
