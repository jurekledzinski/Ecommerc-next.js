import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_ON_STOCK_CART_PRODUCT,
  UPDATE_PRODUCTS_BRAND_ON_STOCK,
  UPDATE_ON_STOCK_PRODUCT_DETAILS,
  UPDATE_TOTAL_PRICE_CART_PRODUCT,
  UPDATE_TOTAL_CART_AMOUNT,
  UPDATE_TOTAL_CART_PRICE,
} from '../utils/constants';

export const controlCart = (
  data,
  idProduct,
  stateCart,
  dispatchCart,
  addedAmountToCart = 1,
  operator = true,
  removeProductFlag = false,
  disptachProductsBrand,
  dispatchDetailsProduct
) => {
  const checkCart = stateCart.products.find((item) => item._id === idProduct);

  if (!checkCart && !removeProductFlag) {
    dispatchCart({
      type: ADD_TO_CART,
      product: data,
      addedAmountToCart: addedAmountToCart,
    });
  } else if (checkCart && !removeProductFlag) {
    dispatchCart({
      type: UPDATE_ON_STOCK_CART_PRODUCT,
      controlStock: operator,
      idProduct,
      addedAmountToCart: addedAmountToCart,
    });
    dispatchCart({
      type: UPDATE_TOTAL_PRICE_CART_PRODUCT,
      controlStock: operator,
      idProduct,
      addedAmountToCart: addedAmountToCart,
    });
    dispatchCart({
      type: UPDATE_TOTAL_CART_AMOUNT,
      controlStock: operator,
      addedAmountToCart: addedAmountToCart,
    });
    dispatchCart({
      type: UPDATE_TOTAL_CART_PRICE,
      controlStock: operator,
      product: data,
      addedAmountToCart: addedAmountToCart,
    });
  }

  if (removeProductFlag && checkCart) {
    dispatchCart({
      type: REMOVE_FROM_CART,
      idProduct,
    });
    disptachProductsBrand({
      type: UPDATE_PRODUCTS_BRAND_ON_STOCK,
      productId: idProduct,
      amountOnStock: checkCart.amount,
    });
    dispatchDetailsProduct({
      type: UPDATE_ON_STOCK_PRODUCT_DETAILS,
      productId: idProduct,
      updateOnStock: checkCart.amount,
    });
    dispatchCart({
      type: UPDATE_TOTAL_CART_AMOUNT,
      controlStock: operator,
      addedAmountToCart: checkCart.amount - checkCart.onStock,
    });
    dispatchCart({
      type: UPDATE_TOTAL_CART_PRICE,
      controlStock: operator,
      product: data,
      addedAmountToCart: checkCart.amount - checkCart.onStock,
    });
  }
};

export const copyCart = (cartState, userState) => {
  let copy = {
    ...cartState,
    products: cartState.products.map((item) => ({
      ...item,
      details: item.details.map((item2) => ({ ...item2 })),
    })),
  };
  copy.idUser = userState?.user?._id;
  return copy;
};
