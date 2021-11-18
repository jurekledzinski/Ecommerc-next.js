import {
  ADD_TO_CART,
  CLOSE_DRAWER,
  FETCH_DATA_BRAND_PRODUCTS,
  FETCH_DETAILS_PRODUCT,
  OPEN_DRAWER,
  REMOVE_FROM_CART,
  SHOW_CART,
  SHOW_CONTACT,
  SHOW_MENU,
  SHOW_SIGN_IN,
  SHOW_SIGN_UP,
  SHOW_FORGET_PASSWORD,
  TOGGLE_DARK_MODE,
  USER_DATA_PROFILE,
  USER_LOGIN_DATA,
  UPDATE_RATE_PRODUCT_DETAILS,
  UPDATE_ON_STOCK_PRODUCT_DETAILS,
  UPDATE_ON_STOCK_CART_PRODUCT,
  UPDATE_TOTAL_PRICE_CART_PRODUCT,
  UPDATE_TOTAL_CART_AMOUNT,
  UPDATE_TOTAL_CART_PRICE,
  UPDATE_PRODUCTS_BRAND_ON_STOCK,
} from './constants';

export const openDrawerReducer = (state, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, openDrawer: true };
    case CLOSE_DRAWER:
      return { ...state, openDrawer: false };
    default:
      return state;
  }
};

export const contentDrawerReducer = (state, action) => {
  switch (action.type) {
    case SHOW_CART:
      return { ...state, contentDrawer: SHOW_CART };
    case SHOW_CONTACT:
      return { ...state, contentDrawer: SHOW_CONTACT };
    case SHOW_MENU:
      return { ...state, contentDrawer: SHOW_MENU };
    case SHOW_SIGN_IN:
      return { ...state, contentDrawer: SHOW_SIGN_IN };
    case SHOW_SIGN_UP:
      return { ...state, contentDrawer: SHOW_SIGN_UP };
    case SHOW_FORGET_PASSWORD:
      return { ...state, contentDrawer: SHOW_FORGET_PASSWORD };
    default:
      return state;
  }
};

export const darkModeReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return { ...state, darkmode: !state.darkmode };
    default:
      return state;
  }
};

export const dataProductsByBrandReducer = (state, action) => {
  switch (action.type) {
    case FETCH_DATA_BRAND_PRODUCTS:
      return action.data;
    case UPDATE_PRODUCTS_BRAND_ON_STOCK:
      return state.map((item) => ({
        ...item,
        onStock:
          item._id === action.productId ? action.amountOnStock : item.onStock,
      }));
    default:
      return state;
  }
};

export const detailsProductReducer = (state, action) => {
  switch (action.type) {
    case FETCH_DETAILS_PRODUCT:
      return action.data;
    case UPDATE_RATE_PRODUCT_DETAILS:
      return { ...state, rate: action.rate };
    case UPDATE_ON_STOCK_PRODUCT_DETAILS:
      return {
        ...state,
        onStock:
          state._id === action.productId ? action.updateOnStock : state.onStock,
      };
    default:
      return state;
  }
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        totalCartAmount: state.totalCartAmount + action.addedAmountToCart,
        totalCartPrice:
          state.totalCartPrice +
          action.product.price * action.addedAmountToCart,
        products: [
          ...state.products,
          {
            ...action.product,
            onStock: action.product.onStock - action.addedAmountToCart,
            totalPrice: action.product.price * action.addedAmountToCart,
          },
        ],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(
          (item) => item._id !== action.idProduct
        ),
      };
    case UPDATE_ON_STOCK_CART_PRODUCT:
      return {
        ...state,
        products: state.products.map((item) => ({
          ...item,
          onStock:
            item._id === action.idProduct
              ? action.controlStock
                ? item.onStock - action.addedAmountToCart
                : item.onStock + action.addedAmountToCart
              : item.onStock,
        })),
      };

    case UPDATE_TOTAL_PRICE_CART_PRODUCT:
      return {
        ...state,
        products: state.products.map((item) => ({
          ...item,
          totalPrice:
            item._id === action.idProduct
              ? action.controlStock
                ? item.totalPrice + item.price * action.addedAmountToCart
                : item.totalPrice - item.price * action.addedAmountToCart
              : item.totalPrice,
        })),
      };

    case UPDATE_TOTAL_CART_AMOUNT:
      return {
        ...state,
        totalCartAmount: action.controlStock
          ? state.totalCartAmount + action.addedAmountToCart
          : state.totalCartAmount - action.addedAmountToCart,
      };
    case UPDATE_TOTAL_CART_PRICE:
      return {
        ...state,
        totalCartPrice: action.controlStock
          ? state.totalCartPrice +
            action.product.price * action.addedAmountToCart
          : state.totalCartPrice -
            action.product.price * action.addedAmountToCart,
      };
    default:
      return state;
  }
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN_DATA:
      return action.data;
    default:
      return state;
  }
};

export const userProfileReducer = (state, action) => {
  switch (action.type) {
    case USER_DATA_PROFILE:
      return action.data;
    default:
      return state;
  }
};
