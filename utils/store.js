import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const StoreContext = createContext();

import { SHOW_MENU } from './constants';
import {
  cartReducer,
  openDrawerReducer,
  contentDrawerReducer,
  darkModeReducer,
  dataProductsByBrandReducer,
  detailsProductReducer,
} from './reducers';

const stateMode = Cookies.get('darkmode') === 'on' ? true : false;
const initialStateOpenDrawer = { openDrawer: false };
const initialStateContentDrawer = { contentDrawer: SHOW_MENU };
const initialStateDarkMode = {
  darkmode: stateMode,
};
const initialStateProductsByBrand = [];
const initialStateDetailsProduct = {};
let initialStateCart;

if (typeof window !== 'undefined') {
  initialStateCart = JSON.parse(localStorage.getItem('cart')) || {
    products: [],
    totalCartAmount: 0,
    totalCartPrice: 0,
  };
}

const StoreProvider = ({ children }) => {
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

  const [stateCart, dispatchCart] = useReducer(cartReducer, initialStateCart);

  return (
    <StoreContext.Provider
      value={{
        stateCart,
        dispatchCart,
        stateContentDrawer,
        disptachContentDrawer,
        stateDarkMode,
        dispatchDarkMode,
        stateDetailsProduct,
        dispatchDetailsProduct,
        stateOpenDrawer,
        disptachOpenDrawer,
        stateProductsBrand,
        disptachProductsBrand,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
