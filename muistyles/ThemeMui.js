import { blue } from '@mui/material/colors';

export const getTheme = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          text: {
            primary: '#555555',
          },
          background: {
            brandCard: '#a7a7a729',
            cardbottom: '#ffffff',
            cardtop: '#ffffff',
            default: '#eeeeee',
            tablerow: '#f2f2f2',
          },
        }
      : {
          primary: {
            main: blue[500],
          },
          background: {
            brandCard: '#555555',
            default: '#555555',
            paper: '#333333',
            cardbottom: '#555555',
            cardtop: '#7a7a7a',
            tablerow: '#555555',
          },
          text: {
            primary: '#ffffff',
          },
        }),
  },
  breakpoints: {
    values: {
      xs: 0,
      sxm: 500,
      sm: 600,
      mxd: 730,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
