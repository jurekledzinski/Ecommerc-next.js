import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react';
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

import {
  CLEAR_USER_LOGIN_DATA,
  CLOSE_DRAWER,
  OPEN_DRAWER,
  SELECT_OPTION_MENU,
  SHOW_CONTACT,
  SHOW_SIGN_IN,
  SHOW_SIGN_UP,
} from '../utils/constants';

import { optionsInMenu } from '../utils/data';

import SnackBarMessage from './SnackBarMessage';

import { StoreContext } from '../utils/store';

import { logOutUser } from '../helpers/client/apiHelpers';

const Menu = () => {
  const router = useRouter();
  const {
    disptachContentDrawer,
    dispatchLoginUser,
    disptachOpenDrawer,
    stateLoginUser,
    stateOpenDrawer,
  } = useContext(StoreContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
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

  const handleItemMenu = async (e, index) => {
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
        const result = await logOutUser(
          `/api/v1/login`,
          stateLoginUser?.tokenAccess,
          setErrorMsg
        );

        if (result.msgSuccess) {
          setSuccessMsg(result.msgSuccess);
          idTimeout.current = setTimeout(() => {
            disptachOpenDrawer({ type: CLOSE_DRAWER });
            disptachOpenDrawer({
              type: SELECT_OPTION_MENU,
              selectOption: 0,
            });
          }, 1100);
        }
        Cookies.remove('darkmode');
        Cookies.remove('_mso');
        dispatchLoginUser({ type: CLEAR_USER_LOGIN_DATA });
        router.push('/');
        break;
      default:
        router.push('/');
        break;
    }
  };

  const renderMenuItems = (item, index) => (
    <ListItemButton
      key={index}
      onClick={(e) => handleItemMenu(e, index)}
      selected={stateOpenDrawer.selectOption === index}
    >
      <ListItemText primary={item.name} sx={listItemStyles} />
    </ListItemButton>
  );

  return (
    <Nav>
      <SnackBarMessage
        errorMsg={errorMsg}
        successMsg={successMsg}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
      <Typography variant="h6" sx={menuTitleStyles}>
        {stateLoginUser?.user
          ? `Welcome ${stateLoginUser.user.name}`
          : 'Welcome'}
      </Typography>
      <List sx={listStyles}>
        {optionsInMenu.map((item, index) => {
          if (Boolean(stateLoginUser?.tokenAccess) && item.logged) {
            return renderMenuItems(item, index);
          } else if (!Boolean(stateLoginUser?.tokenAccess) && item.notLogged) {
            return renderMenuItems(item, index);
          }
        })}
      </List>
    </Nav>
  );
};

export default Menu;
