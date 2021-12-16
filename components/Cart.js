import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import {
  ADD_INVENTORY_ISSUE_PRODUCTS,
  CLOSE_DRAWER,
  HIDE_MODAL,
  OPEN_DRAWER,
  SHOW_MODAL,
  SHOW_SIGN_IN,
} from '../utils/constants';

import {
  boxButtonsStyles,
  btnRemoveStyles,
  boxTitleStyles,
  btnControlQtyStyles,
  cardContentStyles,
  cardTypographyStyles,
  cardMediaStyles,
  cardStyles,
  cardStylesTwo,
  cardStylesThree,
  cartTitleStyles,
  dividerStyles,
  gridContainerOneStyles,
  gridContainerTwoStyles,
  InputNumber,
  itemsCartWrapperStyles,
  itemsTitleStyles,
  Section,
  subtitleStyles,
  buttonCheckoutCartStyles,
  titleCartSummaryStyles,
} from '../muistyles/Cart.styles';

import { headersCart } from '../utils/data';
import { StoreContext } from '../utils/store';
import { controlCart, copyCart } from '../helpers/carthelpers';

import CheckInventory from './CheckInventory';
import ModalPopUp from './ModalPopUp';
import SnackBarMessage from './SnackBarMessage';

import { addCart, checkProductsInventory } from '../helpers/client/apiHelpers';

const Cart = () => {
  const router = useRouter();
  const {
    dispatchCart,
    disptachContentDrawer,
    dispatchInventory,
    dispatchModal,
    disptachProductsBrand,
    dispatchDetailsProduct,
    disptachOpenDrawer,
    stateCart,
    stateModal,
    stateLoginUser,
  } = useContext(StoreContext);
  const { tokenAccess } = stateLoginUser;
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const idTimeout = useRef(null);
  let flagOperation = false;
  const addedAmountToCart = 1;
  const removeProductFlag = true;
  const flagTemp = false;

  const handleCheckInventory = async () => {
    const result = await checkProductsInventory(
      `/api/v1/products`,
      { data: stateCart.products },
      setErrorMsg
    );

    if (Boolean(result) && result?.data.length > 0) {
      dispatchInventory({
        type: ADD_INVENTORY_ISSUE_PRODUCTS,
        data: result?.data,
      });
    }
    return result?.data?.length > 0 ? true : false;
  };

  const handelOrderedProductsAmount = (idProduct, flag) => {
    const singleProduct = stateCart.products.find(
      (item) => item._id === idProduct
    );

    if (flag) {
      controlCart(
        singleProduct,
        idProduct,
        stateCart,
        dispatchCart,
        addedAmountToCart,
        flag
      );
    } else {
      controlCart(
        singleProduct,
        idProduct,
        stateCart,
        dispatchCart,
        addedAmountToCart,
        flag
      );
    }
  };

  const handleRemoveItemFromCart = (idProduct) => {
    const singleProduct = stateCart.products.find(
      (item) => item._id === idProduct
    );

    controlCart(
      singleProduct,
      idProduct,
      stateCart,
      dispatchCart,
      addedAmountToCart,
      flagTemp,
      removeProductFlag,
      disptachProductsBrand,
      dispatchDetailsProduct
    );
  };

  const handleProccedToCheckout = async (e) => {
    e.preventDefault();

    const isIssusInventory = await handleCheckInventory();
    if (isIssusInventory) return dispatchModal({ type: SHOW_MODAL });

    if (!tokenAccess) {
      Cookies.set('check', '1');
      disptachOpenDrawer({ type: CLOSE_DRAWER });

      idTimeout.current = setTimeout(() => {
        disptachOpenDrawer({ type: OPEN_DRAWER });
        disptachContentDrawer({ type: SHOW_SIGN_IN });
        clearTimeout(idTimeout.current);
      }, 800);
    } else {
      const cartAndId = copyCart(stateCart, stateLoginUser.user._id);
      const result = await addCart(
        `/api/v1/cart`,
        cartAndId,
        tokenAccess,
        setErrorMsg
      );

      disptachOpenDrawer({ type: CLOSE_DRAWER });
      router.push('/shipping');

      if (!result) {
        setErrorMsg('Something went wrong. Please try later');
      }
    }
  };

  const handleClose = () => {
    dispatchModal({ type: HIDE_MODAL });
  };

  return (
    <Section>
      <ModalPopUp openModal={stateModal} handleClose={handleClose}>
        <CheckInventory />
      </ModalPopUp>
      <SnackBarMessage
        errorMsg={errorMsg}
        successMsg={successMsg}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
      <Box sx={boxTitleStyles}>
        <Typography variant="h6" sx={cartTitleStyles}>
          Shopping Cart
        </Typography>
        <Typography variant="h6" sx={itemsTitleStyles}>
          {`${stateCart.totalCartAmount} ${
            stateCart.totalCartAmount > 1 || stateCart.totalCartAmount === 0
              ? 'Items'
              : 'Item'
          }`}
        </Typography>
      </Box>
      <Divider variant="middle" sx={dividerStyles} />
      {Boolean(stateCart.totalCartAmount) && (
        <Grid container spacing={1} sx={gridContainerOneStyles}>
          {headersCart.map((item, index) => (
            <Grid item xs={3} key={index}>
              <Typography variant="subtitle1" sx={subtitleStyles}>
                {item}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={itemsCartWrapperStyles}>
        {stateCart.products.map((item) => (
          <article key={item._id}>
            <Grid container spacing={0.5} sx={gridContainerTwoStyles}>
              <Grid item xs={3}>
                <Card sx={cardStyles}>
                  <CardMedia
                    component="img"
                    height="40"
                    image={`${item.imagesSlider[0]}`}
                    srcSet={`${item.imagesSlider[0]}?tr=h-40, 40h`}
                    sizes="40px"
                    alt={item.name}
                    sx={cardMediaStyles}
                  />
                  <CardContent sx={cardContentStyles}>
                    <Typography variant="body2" sx={cardTypographyStyles}>
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={cardStylesTwo}>
                  <InputNumber
                    type="number"
                    value={item.amount - item.onStock}
                    min="1"
                    max={item.onStock}
                    readOnly
                  />
                  <Box sx={boxButtonsStyles}>
                    <Button
                      variant="contained"
                      sx={btnControlQtyStyles}
                      onClick={() =>
                        handelOrderedProductsAmount(item._id, flagOperation)
                      }
                      disabled={item.amount - 1 === item.onStock}
                    >
                      -
                    </Button>
                    <Button
                      variant="contained"
                      sx={btnControlQtyStyles}
                      onClick={() =>
                        handelOrderedProductsAmount(item._id, !flagOperation)
                      }
                      disabled={item.onStock <= 0}
                    >
                      +
                    </Button>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={cardStyles}>
                  <Typography variant="h6" sx={cardStylesThree}>
                    {item.price}€
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={cardStyles}>
                  <Typography variant="h6" sx={cardStylesThree}>
                    {item.totalPrice}€
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={btnRemoveStyles}
              onClick={() => handleRemoveItemFromCart(item._id)}
            >
              Remove item
            </Button>
            <Divider variant="middle" sx={dividerStyles} />
          </article>
        ))}
      </Box>
      <Typography variant="h5" sx={titleCartSummaryStyles}>
        Subtotal: {stateCart.totalCartPrice}€
      </Typography>
      <form onSubmit={handleProccedToCheckout}>
        <Button
          variant="contained"
          sx={buttonCheckoutCartStyles}
          disabled={!Boolean(stateCart.totalCartAmount)}
          type="submit"
        >
          Procced to checkout
        </Button>
      </form>
    </Section>
  );
};

export default Cart;
