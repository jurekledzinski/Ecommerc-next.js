import React, { useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
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
import { controlCart } from '../helpers/carthelpers';

const Cart = () => {
  const {
    dispatchCart,
    disptachProductsBrand,
    dispatchDetailsProduct,
    stateCart,
  } = useContext(StoreContext);

  let flagOperation = false;
  const addedAmountToCart = 1;
  const removeProductFlag = true;
  const flagTemp = false;

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

  return (
    <Section>
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
      <Button
        variant="contained"
        sx={buttonCheckoutCartStyles}
        disabled={!Boolean(stateCart.totalCartAmount)}
      >
        Procced to checkout
      </Button>
    </Section>
  );
};

export default Cart;
