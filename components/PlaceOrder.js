import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import {
  boxCardsWrapper,
  boxBtnsDeliveryStyles,
  btnsDeliveryStyles,
  btnPaymentStyles,
  btnPlaceOrderStyles,
  cardContentDeliveryStyles,
  cardContentTextStyles,
  cardDeliveryStyles,
  cardMediaDeliveryStyles,
  FormMsgPlaceOrder,
  placeOrderBoxLeft,
  placeOrderBoxRight,
  SectionPlaceOrderShip,
  shippingAddressText,
  summaryPlaceOrderTextStyles,
  titlePlaceOrderStyles,
} from '../muistyles/PlaceOrder.styles';

import SnackBarMessage from './SnackBarMessage';

import { ADD_STEP_STEPPER } from '../utils/constants';

import { StoreContext } from '../utils/store';

import { addOrderDetails, getOrderDetails } from '../helpers/client/apiHelpers';

const PlaceOrder = () => {
  const router = useRouter();
  const { dispatchStepper, stateLoginUser } = useContext(StoreContext);
  const { tokenAccess } = stateLoginUser;
  const [btnIndex, setBtnIndex] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [orderState, setOrderState] = useState({});
  const [deliveryName, setDeliveryName] = useState(null);
  const [deliveryPrice, setDeliveryPrice] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const idTimeout = useRef(null);
  const { cart } = orderState;

  const {
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      deliveryName: '',
      paymentMethod: '',
    },
  });

  const deliveryBtns = [
    { name: 'Standard', price: 3, timeDelivery: 2 },
    { name: 'Next day', price: 5, timeDelivery: 1 },
    { name: 'Abroad', price: 8, timeDelivery: 10 },
  ];

  const handleChoosePaymentMethod = () => {
    setPaymentMethod(true);
  };

  const handleChooseDelivery = (
    indexBtn,
    priceDelivery,
    nameDelivery,
    time
  ) => {
    setDeliveryName(nameDelivery);
    setDeliveryPrice(priceDelivery);
    setDeliveryTime(time);
    setBtnIndex(indexBtn);
  };

  const handelRedirect = () => {
    idTimeout.current = setTimeout(() => {
      router.push(
        `/shipping/place-order/details-order/order?id=${orderState.orderId}`
      );
      Cookies.set('step', '3');
      dispatchStepper({
        type: ADD_STEP_STEPPER,
        data: Cookies.get('step'),
      });
    }, 1100);
  };

  const errorMessage = (msg) => {
    return <FormMsgPlaceOrder>{msg}</FormMsgPlaceOrder>;
  };

  const onSubmit = async () => {
    if (paymentMethod === false) {
      setError('paymentMethod', {
        type: 'manual',
        message: 'Please select payment method',
      });
      return;
    }

    if (deliveryName === null) {
      setError('deliveryName', {
        type: 'manual',
        message: 'Please select delivery method',
      });
      return;
    }

    const placeOrderData = {
      deliveryMethod: deliveryName,
      deliveryPrice: deliveryPrice,
      paymentMethod: 'Credit card',
      timeDelivery: deliveryTime,
    };

    const result = await addOrderDetails(
      `/api/v1/order?page=Place_order`,
      placeOrderData,
      tokenAccess,
      setErrorMsg
    );

    if (result?.msgSuccess) {
      setSuccessMsg(result.msgSuccess);
      handelRedirect();
    }
  };

  useEffect(() => {
    if (stateLoginUser?.tokenAccess) {
      const fetchDetailsOrder = async () => {
        const result = await getOrderDetails(
          '/api/v1/order',
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
    Cookies.set('step', '2');
    dispatchStepper({
      type: ADD_STEP_STEPPER,
      data: Cookies.get('step'),
    });
    return () => clearTimeout(idTimeout.current);
  }, []);

  useEffect(() => {
    clearErrors();
  }, [deliveryName, paymentMethod]);

  return (
    <SectionPlaceOrderShip>
      <SnackBarMessage
        errorMsg={errorMsg}
        successMsg={successMsg}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
      <Box sx={placeOrderBoxLeft}>
        <Typography variant="h4" sx={titlePlaceOrderStyles}>
          Select method payment
        </Typography>
        {errors.paymentMethod && errorMessage(errors.paymentMethod.message)}
        <Box sx={{ margin: '10px 0' }}>
          <Button
            variant={paymentMethod ? 'contained' : 'outlined'}
            size="large"
            sx={btnPaymentStyles}
            onClick={handleChoosePaymentMethod}
          >
            Credit Card
          </Button>
        </Box>
        <Typography variant="h4" sx={titlePlaceOrderStyles}>
          Select method delivery
        </Typography>
        {errors.deliveryName && errorMessage(errors.deliveryName.message)}
        <Box sx={boxBtnsDeliveryStyles}>
          {deliveryBtns.map((item, index) => (
            <Button
              key={index}
              variant={btnIndex === index ? 'contained' : 'outlined'}
              size="large"
              sx={btnsDeliveryStyles}
              onClick={() =>
                handleChooseDelivery(
                  index,
                  item.price,
                  item.name,
                  item.timeDelivery
                )
              }
            >
              {item.name} {item.price.toFixed(2)}€
            </Button>
          ))}
        </Box>
        <Typography variant="h4" sx={titlePlaceOrderStyles}>
          Shipping address
        </Typography>
        <Box>
          <Typography variant="body1" sx={shippingAddressText}>
            {Boolean(orderState) && orderState.name}{' '}
            {Boolean(orderState) && orderState.surname}
          </Typography>
          <Typography variant="body1" sx={shippingAddressText}>
            {Boolean(orderState) && orderState.street}
          </Typography>
          <Typography variant="body1" sx={shippingAddressText}>
            {Boolean(orderState) && orderState.zipCode}{' '}
            {Boolean(orderState) && orderState.city}
          </Typography>
          <Typography variant="body1" sx={shippingAddressText}>
            {Boolean(orderState) && orderState.country}
          </Typography>
        </Box>
        <Typography variant="h4" sx={titlePlaceOrderStyles}>
          Your orders
        </Typography>
        <Box sx={boxCardsWrapper}>
          {Boolean(cart) &&
            cart.products.map((item, index) => (
              <Card key={index} sx={cardDeliveryStyles}>
                <CardMedia
                  component="img"
                  sx={cardMediaDeliveryStyles}
                  image={item.imagesSlider[0]}
                  alt="green iguana"
                  height="50px"
                />
                <CardContent sx={cardContentDeliveryStyles}>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={cardContentTextStyles}
                  >
                    Price: {item.price.toFixed(2)}€
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={cardContentTextStyles}
                  >
                    Amount: {item.amount - item.onStock}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Box>
      </Box>
      <Box sx={placeOrderBoxRight}>
        <Typography
          variant="h4"
          sx={{ ...titlePlaceOrderStyles, marginBottom: '10px' }}
        >
          Summary
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ ...summaryPlaceOrderTextStyles, marginBottom: '5px' }}
        >
          Payment: {paymentMethod ? 'Credit card' : 'Not choose'}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ ...summaryPlaceOrderTextStyles, marginBottom: '5px' }}
        >
          Delivery name:{' '}
          {deliveryName !== null ? `${deliveryName}` : 'Not choose'}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ ...summaryPlaceOrderTextStyles, marginBottom: '5px' }}
        >
          Delivery price:{' '}
          {deliveryPrice !== null
            ? `${deliveryPrice.toFixed(2)}€`
            : 'Not choose'}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={summaryPlaceOrderTextStyles}
        >
          Total price:{' '}
          {deliveryPrice !== null
            ? Boolean(cart) && (cart.totalCartPrice + deliveryPrice).toFixed(2)
            : Boolean(cart) && cart.totalCartPrice.toFixed(2)}
          €
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            variant="contained"
            size="large"
            sx={btnPlaceOrderStyles}
            type="submit"
          >
            Place order
          </Button>
        </form>
      </Box>
    </SectionPlaceOrderShip>
  );
};

export default PlaceOrder;
