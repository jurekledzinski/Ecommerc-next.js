import { Fragment, useRouter } from 'next/router';
import React, { useContext, useRef } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import {
  listStyles,
  listItemStyles,
  menuTitleStyles,
  Nav,
} from '../muistyles/Navbar.styles';

import { StoreContext } from '../utils/store';

import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  SHOW_CONTACT,
  SHOW_SIGN_IN,
  SHOW_SIGN_UP,
} from '../utils/constants';

const Menu = () => {
  const router = useRouter();
  const { disptachContentDrawer, disptachOpenDrawer, stateLoginUser } =
    useContext(StoreContext);
  const idTimeout = useRef(null);
  const idTimeoutSec = useRef(null);
  const idTimeoutThird = useRef(null);

  const userId = stateLoginUser?.user?._id;

  const handleItemMenu = (e) => {
    switch (e.target.textContent) {
      case 'Contact':
        disptachOpenDrawer({ type: CLOSE_DRAWER });

        idTimeoutThird.current = setTimeout(() => {
          disptachOpenDrawer({ type: OPEN_DRAWER });
          disptachContentDrawer({ type: SHOW_CONTACT });
          clearTimeout(idTimeoutThird.current);
        }, 800);
        break;
      case 'Orders':
        router.push(`/orders/user?id=${userId ? userId : 'not-found'}`);
        disptachOpenDrawer({ type: CLOSE_DRAWER });
        break;
      case 'Profile':
        router.push(
          `/profile/user-profile?id=${userId ? userId : 'not-found'}`
        );
        disptachOpenDrawer({ type: CLOSE_DRAWER });
        break;
      case 'Sign In':
        disptachOpenDrawer({ type: CLOSE_DRAWER });

        idTimeout.current = setTimeout(() => {
          disptachOpenDrawer({ type: OPEN_DRAWER });
          disptachContentDrawer({ type: SHOW_SIGN_IN });
          clearTimeout(idTimeout.current);
        }, 800);
        break;
      case 'Sign Up':
        disptachOpenDrawer({ type: CLOSE_DRAWER });

        idTimeout.current = setTimeout(() => {
          disptachOpenDrawer({ type: OPEN_DRAWER });
          disptachContentDrawer({ type: SHOW_SIGN_UP });
          clearTimeout(idTimeoutSec.current);
        }, 800);
        break;
      default:
        return null;
    }
  };

  return (
    <Nav>
      <Typography variant="h6" sx={menuTitleStyles}>
        Welcome
      </Typography>
      <List sx={listStyles}>
        {[
          'Home',
          'Contact',
          'Orders',
          'Profile',
          'Sign In',
          'Sign Up',
          'Log out',
        ].map((item) => (
          <ListItem button key={item} onClick={handleItemMenu}>
            <ListItemText primary={item} sx={listItemStyles} />
          </ListItem>
        ))}
      </List>
    </Nav>
  );
};

export default Menu;
