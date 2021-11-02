import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
export const StoreContext = createContext();

import { SHOW_MENU } from './constants';
import {
  openDrawerReducer,
  contentDrawerReducer,
  darkModeReducer,
} from './reducers';

const stateMode = Cookies.get('darkmode') === 'on' ? true : false;
const initialStateOpenDrawer = { openDrawer: false };
const initialStateContentDrawer = { contentDrawer: SHOW_MENU };
const initialStateDarkMode = {
  darkmode: stateMode,
};

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

  return (
    <StoreContext.Provider
      value={{
        stateDarkMode,
        dispatchDarkMode,
        stateOpenDrawer,
        disptachOpenDrawer,
        stateContentDrawer,
        disptachContentDrawer,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
