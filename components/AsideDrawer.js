import React, { useContext } from 'react';
import { Drawer } from '@mui/material';

import Cart from './Cart';
import ForgetPassword from './ForgetPassword';
import Menu from './Menu';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

import { StoreContext } from '../utils/store';
import {
  CLOSE_DRAWER,
  SHOW_CART,
  SHOW_MENU,
  SHOW_SIGN_IN,
  SHOW_SIGN_UP,
  SHOW_FORGET_PASSWORD,
} from '../utils/constants';

const AsideDrawer = () => {
  const { stateOpenDrawer, stateContentDrawer, disptachOpenDrawer } =
    useContext(StoreContext);
  const { contentDrawer } = stateContentDrawer;
  const { openDrawer } = stateOpenDrawer;

  const handleCloseDrawer = () => {
    disptachOpenDrawer({ type: CLOSE_DRAWER });
  };

  const showContent = (type) => {
    switch (type) {
      case SHOW_CART:
        return <Cart />;
      case SHOW_MENU:
        return <Menu />;
      case SHOW_SIGN_IN:
        return <SignInForm />;
      case SHOW_SIGN_UP:
        return <SignUpForm />;
      case SHOW_FORGET_PASSWORD:
        return <ForgetPassword />;
      default:
        return <Menu />;
    }
  };

  return (
    <Drawer anchor={'right'} open={openDrawer} onClose={handleCloseDrawer}>
      {showContent(contentDrawer)}
    </Drawer>
  );
};

export default AsideDrawer;
