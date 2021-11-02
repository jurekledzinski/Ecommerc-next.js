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
  SHOW_SIGN_IN,
  SHOW_SIGN_UP,
} from '../utils/constants';

const Menu = () => {
  const { disptachContentDrawer, disptachOpenDrawer } =
    useContext(StoreContext);
  const idTimeout = useRef(null);
  const idTimeoutSec = useRef(null);

  const handleItemMenu = (e) => {
    switch (e.target.textContent) {
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
        {['Home', 'Contact', 'Sign In', 'Sign Up'].map((item) => (
          <ListItem button key={item} onClick={handleItemMenu}>
            <ListItemText primary={item} sx={listItemStyles} />
          </ListItem>
        ))}
      </List>
    </Nav>
  );
};

export default Menu;
