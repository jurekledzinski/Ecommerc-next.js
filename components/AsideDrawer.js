import React, { useContext } from "react";
import { Drawer } from "@mui/material";

import Cart from "./Cart";
import Menu from "./Menu";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

import { StoreContext } from "../uitils/store";
import {
  CLOSE_DRAWER,
  SHOW_CART,
  SHOW_MENU,
  SHOW_SIGN_IN,
  SHOW_SIGN_UP,
} from "../uitils/constants";

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
      default:
        return <Menu />;
    }
  };

  return (
    <Drawer anchor={"right"} open={openDrawer} onClose={handleCloseDrawer}>
      {showContent(contentDrawer)}
    </Drawer>
  );
};

export default AsideDrawer;
