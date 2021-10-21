import React, { useContext } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  appBarStyles,
  buttonHamburger,
  boxWrapperStyles,
  cartIcon,
  navBarLogostyles,
  StyledBadge,
} from "../muistyles/Navbar.styles";
import { toolbarNavStyles } from "../muistyles/ToolbarNavStyles";

import HamburgerMenu from "./HamburgerMenu";

import { StoreContext } from "../uitils/store";

import { SHOW_CART, SHOW_MENU, OPEN_DRAWER } from "../uitils/constants";

const NavBar = () => {
  const { disptachContentDrawer, disptachOpenDrawer } =
    useContext(StoreContext);

  const handleOpenMenu = () => {
    disptachOpenDrawer({ type: OPEN_DRAWER });
    disptachContentDrawer({ type: SHOW_MENU });
  };

  const handleOpenCart = () => {
    disptachOpenDrawer({ type: OPEN_DRAWER });
    disptachContentDrawer({ type: SHOW_CART });
  };

  return (
    <AppBar sx={appBarStyles}>
      <Toolbar sx={toolbarNavStyles}>
        <Typography variant="h4" sx={navBarLogostyles}>
          Shoppy
        </Typography>
        <Box sx={boxWrapperStyles}>
          <IconButton aria-label="cart" onClick={handleOpenCart}>
            <StyledBadge badgeContent={1} max={10}>
              <ShoppingCartIcon sx={cartIcon} />
            </StyledBadge>
          </IconButton>
          <Button variant="text" sx={buttonHamburger} onClick={handleOpenMenu}>
            <HamburgerMenu />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
