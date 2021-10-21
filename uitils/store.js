import { createContext, useReducer } from "react";

export const StoreContext = createContext();

import { openDrawerReducer, contentDrawerReducer } from "./reducers";

const initialStateOpenDrawer = { openDrawer: false };
const initialStateContentDrawer = { contentDrawer: "SHOW_MENU" };

const StoreProvider = ({ children }) => {
  const [stateOpenDrawer, disptachOpenDrawer] = useReducer(
    openDrawerReducer,
    initialStateOpenDrawer
  );

  const [stateContentDrawer, disptachContentDrawer] = useReducer(
    contentDrawerReducer,
    initialStateContentDrawer
  );

  return (
    <StoreContext.Provider
      value={{
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
