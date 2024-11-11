import React, { useContext } from 'react';
import NextLink from 'next/link';
import Cookies from 'js-cookie';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import {
  appBarStyles,
  buttonHamburger,
  boxWrapperStyles,
  cartIcon,
  logoLinkStyles,
  navBarLogostyles,
  StyledBadge,
} from '../muistyles/Navbar.styles';

import { toolbarNavStyles } from '../muistyles/ToolbarNavStyles';

import HamburgerMenu from './HamburgerMenu';

import { StoreContext } from '../utils/store';

import {
  SHOW_CART,
  TOGGLE_DARK_MODE,
  SHOW_MENU,
  OPEN_DRAWER,
} from '../utils/constants';

const NavBar = () => {
  const {
    dispatchDarkMode,
    disptachContentDrawer,
    disptachOpenDrawer,
    stateCart,
    stateDarkMode,
  } = useContext(StoreContext);
  const { darkmode } = stateDarkMode;

  const handleOpenMenu = () => {
    disptachOpenDrawer({ type: OPEN_DRAWER });
    disptachContentDrawer({ type: SHOW_MENU });
  };

  const handleOpenCart = () => {
    disptachOpenDrawer({ type: OPEN_DRAWER });
    disptachContentDrawer({ type: SHOW_CART });
  };

  const handleToggleDarkMode = () => {
    dispatchDarkMode({ type: TOGGLE_DARK_MODE });
    Cookies.set('darkmode', !darkmode ? 'on' : 'off');
  };

  return (
    <AppBar sx={appBarStyles}>
      <Toolbar sx={toolbarNavStyles}>
        <NextLink href="/" passHref>
          <Typography variant="h4" sx={navBarLogostyles}>
            Shoppy
          </Typography>
        </NextLink>
        <Box sx={boxWrapperStyles}>
          <IconButton onClick={handleToggleDarkMode}>
            {darkmode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton aria-label="cart" onClick={handleOpenCart}>
            <StyledBadge badgeContent={stateCart.totalCartAmount} max={99}>
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
