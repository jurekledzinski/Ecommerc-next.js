import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  SHOW_CART,
  SHOW_MENU,
  SHOW_SIGN_IN,
  SHOW_SIGN_UP,
  SHOW_FORGET_PASSWORD,
  TOGGLE_DARK_MODE,
} from './constants';

export const openDrawerReducer = (state, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, openDrawer: true };
    case CLOSE_DRAWER:
      return { ...state, openDrawer: false };
    default:
      return state;
  }
};

export const contentDrawerReducer = (state, action) => {
  switch (action.type) {
    case SHOW_CART:
      return { ...state, contentDrawer: SHOW_CART };
    case SHOW_MENU:
      return { ...state, contentDrawer: SHOW_MENU };
    case SHOW_SIGN_IN:
      return { ...state, contentDrawer: SHOW_SIGN_IN };
    case SHOW_SIGN_UP:
      return { ...state, contentDrawer: SHOW_SIGN_UP };
    case SHOW_FORGET_PASSWORD:
      return { ...state, contentDrawer: SHOW_FORGET_PASSWORD };
    default:
      return state;
  }
};

export const darkModeReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return { ...state, darkmode: !state.darkmode };
    default:
      return state;
  }
};
