import Cookies from 'js-cookie';
import { createContext, useEffect, useReducer, useState } from 'react';

export const StoreContext = createContext();

import { addCart, getCart } from '../helpers/client/apiHelpers';

import { CREATE_CART, SHOW_MENU } from './constants';
import {
  cartReducer,
  categoryBrandsReducer,
  editFormReducer,
  modalReducer,
  openDrawerReducer,
  contentDrawerReducer,
  darkModeReducer,
  dataProductsByBrandReducer,
  detailsProductReducer,
  inventoryIssueReducer,
  ordersUserReducer,
  stepperReducer,
  reviewReducer,
  userProfileReducer,
  userReducer,
} from './reducers';

const stateMode = Cookies.get('darkmode') === 'on' ? true : false;

const initialStateCategoryBrands = [];
const initialStateContentDrawer = { contentDrawer: SHOW_MENU };
const initialStateDarkMode = {
  darkmode: stateMode,
};
const initialStateEditForm = {
  editForm: false,
};
const initialStateInventory = [];
const initialStateModal = false;
const initialStateProductsByBrand = [];
const initialStateDetailsProduct = {};
const initialStateLoginUser = {};
const initialStateOrdersUser = [];
const initialStateProfileUser = {};
const initialStateReview = [];
const initialStateStepper = Number(Cookies.get('step')) || 1;

const StoreProvider = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState('');

  const menuOption = Number(Cookies.get('_mso'));

  const initialStateOpenDrawer = {
    openDrawer: false,
    selectOption: Boolean(menuOption) ? menuOption : 0,
  };

  const initialStateCartLoggedUser = {
    products: [],
    totalCartAmount: 0,
    totalCartPrice: 0,
  };

  let initialStateCartNotLoggedUser;

  if (typeof window !== 'undefined' && !stateLoginUser?.tokenAccess) {
    initialStateCartNotLoggedUser = JSON.parse(
      localStorage.getItem('cart')
    ) || {
      products: [],
      totalCartAmount: 0,
      totalCartPrice: 0,
    };
  }

  const [stateOpenDrawer, disptachOpenDrawer] = useReducer(
    openDrawerReducer,
    initialStateOpenDrawer
  );

  const [stateContentDrawer, disptachContentDrawer] = useReducer(
    contentDrawerReducer,
    initialStateContentDrawer
  );

  const [stateDarkMode, dispatchDarkMode] = useReducer(
    darkModeReducer,
    initialStateDarkMode
  );

  const [stateProductsBrand, disptachProductsBrand] = useReducer(
    dataProductsByBrandReducer,
    initialStateProductsByBrand
  );

  const [stateDetailsProduct, dispatchDetailsProduct] = useReducer(
    detailsProductReducer,
    initialStateDetailsProduct
  );

  const [stateLoginUser, dispatchLoginUser] = useReducer(
    userReducer,
    initialStateLoginUser
  );

  const [stateCart, dispatchCart] = useReducer(
    cartReducer,
    Object.keys(stateLoginUser).length > 0 && stateLoginUser?.tokenAccess
      ? initialStateCartLoggedUser
      : initialStateCartNotLoggedUser
  );

  const [stateUserProfile, dispatchUserProfile] = useReducer(
    userProfileReducer,
    initialStateProfileUser
  );

  const [stateStepper, dispatchStepper] = useReducer(
    stepperReducer,
    initialStateStepper
  );

  const [stateReviews, dispatchReview] = useReducer(
    reviewReducer,
    initialStateReview
  );

  const [stateEditForm, dispatchEditForm] = useReducer(
    editFormReducer,
    initialStateEditForm
  );

  const [stateOrdersUser, dispatchOrdersUser] = useReducer(
    ordersUserReducer,
    initialStateOrdersUser
  );

  const [stateCategoryBrands, dispatchStateCategoryBrands] = useReducer(
    categoryBrandsReducer,
    initialStateCategoryBrands
  );

  const [stateInventory, dispatchInventory] = useReducer(
    inventoryIssueReducer,
    initialStateInventory
  );

  const [stateModal, dispatchModal] = useReducer(
    modalReducer,
    initialStateModal
  );

  useEffect(() => {
    if (Boolean(stateLoginUser.tokenAccess) && stateCart.products.length >= 0) {
      const updateCart = async () => {
        await addCart(
          `http://localhost:3000/api/v1/cart`,
          stateCart,
          stateLoginUser?.tokenAccess,
          setErrorMsg
        );
      };
      updateCart();
    }
  }, [stateCart]);

  useEffect(() => {
    if (Boolean(stateLoginUser.tokenAccess)) {
      const fetchCart = async () => {
        const result = await getCart(
          `http://localhost:3000/api/v1/cart`,
          stateLoginUser?.tokenAccess,
          setErrorMsg
        );
        dispatchCart({ type: CREATE_CART, data: result.data });
      };
      fetchCart();
    }
  }, [stateLoginUser]);

  return (
    <StoreContext.Provider
      value={{
        stateCategoryBrands,
        dispatchStateCategoryBrands,
        stateCart,
        dispatchCart,
        stateContentDrawer,
        disptachContentDrawer,
        stateDarkMode,
        dispatchDarkMode,
        stateDetailsProduct,
        dispatchDetailsProduct,
        stateEditForm,
        dispatchEditForm,
        stateInventory,
        dispatchInventory,
        stateModal,
        dispatchModal,
        stateLoginUser,
        dispatchLoginUser,
        stateOpenDrawer,
        disptachOpenDrawer,
        stateProductsBrand,
        disptachProductsBrand,
        stateReviews,
        dispatchReview,
        stateStepper,
        dispatchStepper,
        stateUserProfile,
        dispatchUserProfile,
        stateOrdersUser,
        dispatchOrdersUser,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
