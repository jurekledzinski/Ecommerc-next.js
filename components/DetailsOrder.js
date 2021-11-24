import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js/pure';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import {
  boxCardsDetailsWrapper,
  btnDetailsMethodsyStyles,
  detailsCardStyles,
  detailsCardContentStyles,
  detailsCardContentTextStyles,
  detailsCardMediaStyles,
  detailsOrderBoxLeft,
  detailsOrderBoxRight,
  detailsSummaryBtnStyles,
  detailsSummarySubTextStyles,
  FormMsgErrorConfrim,
  SectionDetailsOrder,
  titleDetailsOrderStyles,
  titleDetailsOrderShipStyles,
  shippingAddressTextDetails,
} from '../muistyles/DetailsOrder.styles';

import SnackBarMessage from './SnackBarMessage';

import { ADD_STEP_STEPPER } from '../utils/constants';

import { StoreContext } from '../utils/store';

import {
  addOrderDetails,
  createCheckout,
  getKey,
  getOrderDetails,
} from '../helpers/client/apiHelpers';

const DetailsOrder = () => {
  const { dispatchStepper, stateLoginUser } = useContext(StoreContext);
  const { tokenAccess } = stateLoginUser;
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [orderState, setOrderState] = useState({});
  const [stripe, setStripe] = useState(null);
  const { cart } = orderState;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      checkbox: false,
    },
  });

  const handelRedirect = () => {
    Cookies.set('step', '4');
    dispatchStepper({
      type: ADD_STEP_STEPPER,
      data: Number(Cookies.get('step')),
    });
  };

  const onSubmit = async (data) => {
    handelRedirect();
    const dataOrder = {
      isDelivered: false,
      isPaid: false,
      termsConditions: data.checkbox,
    };
    const productsOrder = {
      deliveryName: orderState.deliveryMethod,
      deliveryPrice: orderState.deliveryPrice,
      deliveryTime: orderState.timeDelivery,
      products: orderState.cart.products,
      orderId: orderState.orderId,
    };

    const responseOrder = await addOrderDetails(
      `http://localhost:3000/api/v1/order?page=Details_order`,
      dataOrder,
      tokenAccess,
      setErrorMsg
    );

    if (responseOrder.msgSuccess) {
      setSuccessMsg(responseOrder.msgSuccess);
    }

    const result = await createCheckout(
      'http://localhost:3000/api/create-checkout-session',
      productsOrder,
      tokenAccess,
      setErrorMsg
    );

    if (result.sessionId) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: result.sessionId,
      });

      if (error.message) {
        setErrorMsg(error.message);
        return;
      }
    }
  };

  useEffect(() => {
    if (stateLoginUser?.tokenAccess) {
      const fetchDetailsOrder = async () => {
        const result = await getOrderDetails(
          'http://localhost:3000/api/v1/order',
          tokenAccess,
          setErrorMsg
        );

        if (result?.data) {
          setOrderState(result.data);
        }
      };

      fetchDetailsOrder();
    }
  }, [stateLoginUser]);

  useEffect(() => {
    Cookies.set('step', '3');
  }, []);

  useEffect(() => {
    if (stateLoginUser?.tokenAccess) {
      const loadingStripe = async () => {
        const result = await getKey(
          'http://localhost:3000/api/create-checkout-session',
          tokenAccess,
          setErrorMsg
        );

        const stripe = await loadStripe(result.key);
        setStripe(stripe);
      };
      loadingStripe();
    }
  }, [stateLoginUser]);

  const errorMessage = (msg) => {
    return <FormMsgErrorConfrim>{msg}</FormMsgErrorConfrim>;
  };

  return (
    <SectionDetailsOrder>
      <SnackBarMessage
        errorMsg={errorMsg}
        successMsg={successMsg}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
      <Box sx={detailsOrderBoxLeft}>
        <Typography variant="h4" sx={titleDetailsOrderStyles}>
          Order id: {orderState.orderId}
        </Typography>
        <Typography
          variant="h4"
          sx={{ ...titleDetailsOrderStyles, marginBottom: 'initial' }}
        >
          Payment method
        </Typography>
        <Box sx={{ margin: '10px 0' }}>
          <Button
            variant="contained"
            size="large"
            sx={btnDetailsMethodsyStyles}
          >
            {orderState.paymentMethod}
          </Button>
        </Box>
        <Typography variant="h4" sx={titleDetailsOrderStyles}>
          Delivery method
        </Typography>
        <Button variant="contained" size="large" sx={btnDetailsMethodsyStyles}>
          {orderState.deliveryMethod}{' '}
          {Boolean(orderState.deliveryPrice) &&
            orderState.deliveryPrice.toFixed(2)}
          €
        </Button>
        <Typography variant="h4" sx={titleDetailsOrderShipStyles}>
          Shipping address
        </Typography>
        <Box>
          <Typography variant="body1" sx={shippingAddressTextDetails}>
            {Boolean(orderState) && orderState.name}{' '}
            {Boolean(orderState) && orderState.surname}
          </Typography>
          <Typography variant="body1" sx={shippingAddressTextDetails}>
            {Boolean(orderState) && orderState.street}
          </Typography>
          <Typography variant="body1" sx={shippingAddressTextDetails}>
            {Boolean(orderState) && orderState.zipCode}{' '}
            {Boolean(orderState) && orderState.city}
          </Typography>
          <Typography variant="body1" sx={shippingAddressTextDetails}>
            {Boolean(orderState) && orderState.country}
          </Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{ ...titleDetailsOrderStyles, margin: '15px 0' }}
        >
          Your orders
        </Typography>
        <Box sx={boxCardsDetailsWrapper}>
          {Boolean(cart) &&
            cart.products.map((item, index) => (
              <Card key={index} sx={detailsCardStyles}>
                <CardMedia
                  component="img"
                  sx={detailsCardMediaStyles}
                  image={item.imagesSlider[0]}
                  alt="green iguana"
                  height="50px"
                />
                <CardContent sx={detailsCardContentStyles}>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={detailsCardContentTextStyles}
                  >
                    Price: {item.price.toFixed(2)}€
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={detailsCardContentTextStyles}
                  >
                    Amount: {item.amount - item.onStock}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Box>
      </Box>
      <Box sx={detailsOrderBoxRight}>
        <Typography
          variant="h4"
          sx={{ ...titleDetailsOrderStyles, marginBottom: '10px' }}
        >
          Summary
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ ...detailsSummarySubTextStyles, marginBottom: '5px' }}
        >
          Payment: {orderState.paymentMethod}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ ...detailsSummarySubTextStyles, marginBottom: '5px' }}
        >
          Delivery name: {orderState.deliveryMethod}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ ...detailsSummarySubTextStyles, marginBottom: '5px' }}
        >
          Delivery price:{' '}
          {Boolean(orderState.deliveryPrice) &&
            orderState.deliveryPrice.toFixed(2)}
          €
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={detailsSummarySubTextStyles}
        >
          Total price:{' '}
          {Boolean(cart) &&
            (cart.totalCartPrice + orderState.deliveryPrice).toFixed(2)}
          €
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            variant="contained"
            size="large"
            sx={detailsSummaryBtnStyles}
            type="submit"
          >
            Checkout
          </Button>
          {errors.checkbox && errorMessage(errors.checkbox.message)}
          <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="checkbox"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Checking the terms and conditions is required ',
                    },
                  }}
                  render={({ field }) => <Checkbox {...field} />}
                />
              }
              label="Terms & conditions"
            />
          </FormGroup>
        </form>
      </Box>
    </SectionDetailsOrder>
  );
};

export default DetailsOrder;
