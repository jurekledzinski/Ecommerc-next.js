import {
  ADD_CATEGORY_BRANDS,
  ADD_INVENTORY_ISSUE_PRODUCTS,
  ADD_ORDERS_USER,
  ADD_TO_CART,
  ADD_REVIEW,
  ADD_STEP_STEPPER,
  CLEAR_CART,
  CLEAR_DETAILS_PRODUCT,
  CLEAR_USER_LOGIN_DATA,
  CREATE_CART,
  CLOSE_DRAWER,
  CLOSE_EDIT_FORM,
  CLEAR_PRODUCTS_BRAND,
  DELETE_REVIEW,
  FETCH_DATA_BRAND_PRODUCTS,
  FETCH_DETAILS_PRODUCT,
  GET_REVIEW,
  HIDE_MODAL,
  OPEN_DRAWER,
  REMOVE_FROM_CART,
  SELECT_OPTION_MENU,
  SHOW_CART,
  SHOW_CONTACT,
  SHOW_MODAL,
  SHOW_MENU,
  SHOW_SIGN_IN,
  SHOW_SIGN_UP,
  SHOW_FORGET_PASSWORD,
  TOGGLE_DARK_MODE,
  TOGGLE_EDIT_FORM,
  USER_DATA_CLEAR_PROFILE,
  USER_DATA_PROFILE,
  UPDATE_LIKE_REVIEW,
  USER_LOGIN_DATA,
  UPDATE_RATE_PRODUCT_DETAILS,
  UPDATE_REVIEW,
  UPDATE_ON_STOCK_PRODUCT_DETAILS,
  UPDATE_ON_STOCK_CART_PRODUCT,
  UPDATE_ORDERS_USER_DELIVERY,
  UPDATE_TOTAL_PRICE_CART_PRODUCT,
  UPDATE_TOTAL_CART_AMOUNT,
  UPDATE_TOTAL_CART_PRICE,
  UPDATE_PRODUCTS_BRAND_ON_STOCK,
  UPDATE_CART_AMOUNT_INVENTORY,
  UPDATE_ON_STOCK_CART_PRODUCT_INVENTORY,
  UPDATE_TOTAL_PRICE_CART_PRODUCT_INVENTORY,
  UPDATE_TOTAL_CART_AMOUNT_INVENTORY,
  UPDATE_TOTAL_CART_PRICE_INVENTORY,
} from './constants';

export const openDrawerReducer = (state, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, openDrawer: true };
    case CLOSE_DRAWER:
      return { ...state, openDrawer: false };
    case SELECT_OPTION_MENU:
      return { ...state, selectOption: action.selectOption };
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
    case CLEAR_PRODUCTS_BRAND:
      return action.data;
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
    case CLEAR_DETAILS_PRODUCT:
      return action.data;
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

    case CLEAR_CART:
      return {
        products: [],
        totalCartAmount: 0,
        totalCartPrice: 0,
      };

    case CREATE_CART:
      return action.data;

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

    case UPDATE_CART_AMOUNT_INVENTORY:
      return {
        ...state,
        products: state.products.map((item) => ({
          ...item,
          amount:
            item._id === action.idProduct
              ? item.amount - item.onStock - action.originalAmount
              : item.amount,
        })),
      };

    case UPDATE_ON_STOCK_CART_PRODUCT_INVENTORY:
      return {
        ...state,
        products: state.products.map((item) => ({
          ...item,
          onStock: item._id === action.idProduct ? 0 : item.onStock,
        })),
      };

    case UPDATE_TOTAL_PRICE_CART_PRODUCT_INVENTORY:
      return {
        ...state,
        products: state.products.map((item) => ({
          ...item,
          totalPrice:
            item._id === action.idProduct
              ? item.totalPrice - item.price * action.reduceAmountFromCart
              : item.totalPrice,
        })),
      };

    case UPDATE_TOTAL_CART_AMOUNT_INVENTORY:
      return {
        ...state,
        totalCartAmount: state.totalCartAmount - action.reduceAmountFromCart,
      };

    case UPDATE_TOTAL_CART_PRICE_INVENTORY:
      return {
        ...state,
        totalCartPrice:
          state.totalCartPrice -
          action.product.price * action.reduceAmountFromCart,
      };

    default:
      return state;
  }
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN_DATA:
      return action.data;
    case CLEAR_USER_LOGIN_DATA:
      return {};
    default:
      return state;
  }
};

export const userProfileReducer = (state, action) => {
  switch (action.type) {
    case USER_DATA_PROFILE:
      return action.data;
    case USER_DATA_CLEAR_PROFILE:
      return action.data;
    default:
      return state;
  }
};

export const stepperReducer = (state, action) => {
  switch (action.type) {
    case ADD_STEP_STEPPER:
      return action.data;
    default:
      return state;
  }
};

export const reviewReducer = (state, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return [...state, action.data];
    case DELETE_REVIEW:
      return state.filter((item) => item._id !== action.idReview);
    case GET_REVIEW:
      return action.data;
    case UPDATE_LIKE_REVIEW:
      return state.map((item) => ({
        ...item,
        likes: item._id === action.idReview ? action.data : item.likes,
      }));
    case UPDATE_REVIEW:
      return state.map((item) => ({
        ...item,
        rate: item._id === action.idReview ? action.editRateData : item.rate,
        review:
          item._id === action.idReview ? action.editReviewData : item.review,
      }));
    default:
      return state;
  }
};

export const editFormReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_EDIT_FORM:
      return { ...state, editForm: !state.editForm };
    case CLOSE_EDIT_FORM:
      return { ...state, editForm: false };
    default:
      return state;
  }
};

export const ordersUserReducer = (state, action) => {
  switch (action.type) {
    case ADD_ORDERS_USER:
      return action.data;
    case UPDATE_ORDERS_USER_DELIVERY:
      return state.map((item) => ({
        ...item,
        dateDelivery: item.orderId === action.orderId ? new Date() : null,
        isDelivered: item.orderId === action.orderId ? true : false,
      }));
    default:
      return state;
  }
};

export const categoryBrandsReducer = (state, action) => {
  switch (action.type) {
    case ADD_CATEGORY_BRANDS:
      return action.data;
    default:
      return state;
  }
};

export const inventoryIssueReducer = (state, action) => {
  switch (action.type) {
    case ADD_INVENTORY_ISSUE_PRODUCTS:
      return action.data;
    default:
      return state;
  }
};

export const modalReducer = (state, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return true;
    case HIDE_MODAL:
      return false;
    default:
      return state;
  }
};
