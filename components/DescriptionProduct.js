import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  bntAddToCartStyles,
  btnStyles,
  descriptionStyles,
  InputNumber,
  priceStyles,
  onStockStyles,
  ratingStyles,
  titleProductStyles,
  wrapperBtnsStyles,
  wrapperDescription,
  wrapperStockStyles,
} from '../muistyles/DescriptionProduct.styles';

import { UPDATE_ON_STOCK_PRODUCT_DETAILS } from '../utils/constants';
import { StoreContext } from '../utils/store';
import { controlCart } from '../helpers/carthelpers';

const DescriptionProduct = () => {
  const {
    stateCart,
    stateLoginUser,
    dispatchCart,
    dispatchDetailsProduct,
    stateDetailsProduct,
  } = useContext(StoreContext);
  const { description, _id, name, onStock, price, rate } = stateDetailsProduct;
  const [controlOnStock, setControlOnStock] = useState(1);
  const flagOperation = useRef(false);

  const handleAmountOnStock = (flag) => {
    if (flag) {
      setControlOnStock((prevValue) => prevValue + 1);
    } else {
      setControlOnStock((prevValue) => prevValue - 1);
    }
  };

  const handleAddToCart = () => {
    let copyProduct = {
      ...stateDetailsProduct,
      amount: stateDetailsProduct.onStock,
    };
    controlCart(copyProduct, _id, stateCart, dispatchCart, controlOnStock);
    setControlOnStock(1);
  };

  useEffect(() => {
    if (!Boolean(stateLoginUser.tokenAccess)) {
      localStorage.setItem('cart', JSON.stringify(stateCart));
    }

    stateCart.products.forEach((item) => {
      dispatchDetailsProduct({
        type: UPDATE_ON_STOCK_PRODUCT_DETAILS,
        productId: item._id,
        updateOnStock: item.onStock,
      });
    });
  }, [stateCart]);

  return (
    <Box variant="article" sx={wrapperDescription}>
      <Box>
        <Typography variant="h3" sx={titleProductStyles}>
          {name}
        </Typography>
        <Stack spacing={1} sx={ratingStyles}>
          <Rating
            name="half-rating-read"
            value={parseInt(rate)}
            precision={0.5}
            readOnly
            size="medium"
          />
        </Stack>
        <Typography variant="h4" sx={priceStyles}>
          Price: {price}€
        </Typography>
        <Typography variant="body2" sx={descriptionStyles}>
          {description}
        </Typography>
      </Box>
      <Box>
        <Box sx={wrapperBtnsStyles}>
          <Button
            variant="contained"
            sx={btnStyles}
            onClick={() => handleAmountOnStock(flagOperation.current)}
            disabled={
              onStock === 0 ? true : controlOnStock === 1 ? true : false
            }
          >
            -
          </Button>
          <InputNumber
            type="number"
            value={controlOnStock}
            min="1"
            max={onStock}
            readOnly
          />
          <Button
            variant="contained"
            sx={btnStyles}
            onClick={() => handleAmountOnStock(!flagOperation.current)}
            disabled={
              onStock === 0 ? true : controlOnStock === onStock ? true : false
            }
          >
            +
          </Button>
        </Box>
        <Box sx={wrapperStockStyles}>
          <Button
            variant="contained"
            sx={bntAddToCartStyles}
            onClick={() => handleAddToCart()}
            disabled={onStock === 0}
          >
            {onStock === 0 ? 'Out of stock' : 'Add to cart'}
          </Button>
          <Typography variant="h5" sx={onStockStyles}>
            In Stock: {onStock}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DescriptionProduct;
