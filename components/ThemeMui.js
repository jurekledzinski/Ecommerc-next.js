import React, { useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../muistyles/ThemeMui';

import { StoreContext } from '../utils/store';

const ThemeMui = ({ children }) => {
  const { stateDarkMode } = useContext(StoreContext);
  const { darkmode } = stateDarkMode;
  const mode = darkmode ? 'dark' : 'light';
  const darkModeTheme = createTheme(getTheme(mode));
  return <ThemeProvider theme={darkModeTheme}>{children}</ThemeProvider>;
};

export default ThemeMui;
