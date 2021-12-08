import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useRef } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

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
  SELECT_OPTION_MENU,
  SHOW_CONTACT,
  SHOW_SIGN_IN,
  SHOW_SIGN_UP,
} from '../utils/constants';

const Menu = () => {
  const router = useRouter();
  const {
    disptachContentDrawer,
    disptachOpenDrawer,
    stateLoginUser,
    stateOpenDrawer,
  } = useContext(StoreContext);
  const idTimeout = useRef(null);
  const idTimeoutSec = useRef(null);
  const idTimeoutThird = useRef(null);

  const userId = stateLoginUser?.user?._id;

  const checkUrl = () => {
    const isOrdersUrl = router.asPath.indexOf('orders/user?id');
    const isProfileUrl = router.asPath.indexOf('profile/user-profile');

    const isExistUrl = {
      orderUrl: isOrdersUrl !== -1 ? 2 : false,
      profileUrl: isProfileUrl !== -1 ? 3 : false,
    };

    const { orderUrl, profileUrl } = isExistUrl;

    if (Boolean(orderUrl)) {
      Cookies.set('_mso', '2');
      return { orderUrl };
    }
    if (Boolean(profileUrl)) {
      Cookies.set('_mso', '3');
      return { profileUrl };
    }
    Cookies.remove('_mso');
    return { orderUrl: false, profileUrl: false };
  };

  const handleItemMenu = (e, index) => {
    disptachOpenDrawer({ type: SELECT_OPTION_MENU, selectOption: index });

    switch (e.target.textContent) {
      case 'Home':
        Cookies.remove('_mso');
        disptachOpenDrawer({ type: CLOSE_DRAWER });
        router.push('/');
        break;
      case 'Contact':
        disptachOpenDrawer({ type: CLOSE_DRAWER });
        idTimeoutThird.current = setTimeout(() => {
          disptachOpenDrawer({ type: OPEN_DRAWER });
          disptachContentDrawer({ type: SHOW_CONTACT });
          const { orderUrl, profileUrl } = checkUrl();
          disptachOpenDrawer({
            type: SELECT_OPTION_MENU,
            selectOption:
              profileUrl || orderUrl ? (profileUrl ? profileUrl : orderUrl) : 0,
          });
          clearTimeout(idTimeoutThird.current);
        }, 800);
        break;
      case 'Orders':
        router.push(`/orders/user?id=${userId ? userId : 'not-found'}`);
        Cookies.set('_mso', '2');
        disptachOpenDrawer({ type: CLOSE_DRAWER });
        break;
      case 'Profile':
        router.push(
          `/profile/user-profile?id=${userId ? userId : 'not-found'}`
        );
        Cookies.set('_mso', '3');
        disptachOpenDrawer({ type: CLOSE_DRAWER });
        break;
      case 'Sign In':
        disptachOpenDrawer({ type: CLOSE_DRAWER });

        idTimeout.current = setTimeout(() => {
          disptachOpenDrawer({ type: OPEN_DRAWER });
          disptachContentDrawer({ type: SHOW_SIGN_IN });
          disptachOpenDrawer({ type: SELECT_OPTION_MENU, selectOption: 0 });
          clearTimeout(idTimeout.current);
        }, 800);
        break;
      case 'Sign Up':
        disptachOpenDrawer({ type: CLOSE_DRAWER });

        idTimeout.current = setTimeout(() => {
          disptachOpenDrawer({ type: OPEN_DRAWER });
          disptachContentDrawer({ type: SHOW_SIGN_UP });
          disptachOpenDrawer({ type: SELECT_OPTION_MENU, selectOption: 0 });
          clearTimeout(idTimeoutSec.current);
        }, 800);
        break;
      case 'Log out':
        Cookies.remove('_mso');
      default:
        return null;
    }
  };

  return (
    <Nav>
      <Typography variant="h6" sx={menuTitleStyles}>
        {stateLoginUser?.user
          ? `Welcome ${stateLoginUser.user.name}`
          : 'Welcome'}
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
        ].map((item, index) => (
          <ListItemButton
            key={item}
            onClick={(e) => handleItemMenu(e, index)}
            selected={stateOpenDrawer.selectOption === index}
          >
            <ListItemText primary={item} sx={listItemStyles} />
          </ListItemButton>
        ))}
      </List>
    </Nav>
  );
};

export default Menu;
