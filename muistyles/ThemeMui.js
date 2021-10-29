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
            cardbottom: '#ffffff',
            cardtop: '#ffffff',
            default: '#eeeeee',
          },
        }
      : {
          primary: {
            main: blue[500],
          },
          background: {
            default: '#555555',
            paper: '#333333',
            cardbottom: '#555555',
            cardtop: '#7a7a7a',
          },
          text: {
            primary: '#ffffff',
          },
        }),
  },
});

// const theme = createTheme({
//   palette: {
//     mode: 'light',
//     text: {
//       primary: '#555555',
//     },
//     secondary: {
//       main: '#889aaa',
//     },
//   },
//   myButton: {
//     backgroundColor: 'red',
//     color: 'white',
//     width: 100 + '%',
//     padding: `${10}px ${0}px`,
//     boxShadow: `0px 0px 1px 2px blue`,
//     ':hover': {
//       backgroundColor: 'orange',
//     },
//   },
// });

// export default theme;

// export const buttonStyles = (theme) => ({ ...theme.myButton });

// Jesli dodasz style w createThem dla buttonow np myButton to mozesz
//zapisac to tak: export const buttonStyles = (theme) => ({ ...theme.myButton });

//Tak pobrane w komponencie gdzie używamy tego

// import { buttonStyles } from "./components/styles/AppStyles";

// const App = () => {
//   return (
//     <div className="app">
//       <Button variant="contained" startIcon={<PersonIcon />} sx={buttonStyles}>
//         Hello World
//       </Button>
//     </div>
//   );
// };
