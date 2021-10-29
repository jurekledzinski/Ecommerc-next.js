import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

export const appBarStyles = {
  position: 'static',
  backgroundColor: (theme) => theme.palette.background.paper,
  //   boxShadow: (theme) => `0 0 0px 2px ${theme.palette.background.default}`,
  borderBottom: (theme) => `1px solid ${theme.palette.background.default}`,
};

export const logoLinkStyles = {
  textDecoration: 'none',
};

export const navBarLogostyles = {
  marginLeft: { xs: '10px', lg: 'initial' },
  color: (theme) => theme.palette.text.primary,
  textTransform: 'uppercase',
  fontFamily: 'Oswald, sans-serif',
  fontWeight: 500,
  '&::first-letter': {
    color: '#1976d2',
  },
};

export const boxWrapperStyles = {
  display: 'flex',
  alignItems: 'center',
  marginTop: '6px',
};

export const MenuIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  width: '20px',
  height: '18px',
  margin: '0 10px',
}));

export const MenuLine = styled('div')(({ theme }) => ({
  width: '100%',
  height: '3px',
  backgroundColor: theme.palette.text.primary,
  ':nth-of-type(2)': { width: '80%' },
  ':nth-of-type(3)': { width: '60%' },
}));

export const buttonHamburger = {
  minWidth: 'initial',
  padding: 'initial',
};

export const cartIcon = {
  color: (theme) => theme.palette.text.primary,
  fontSize: '20px',
};

export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: '#2196f3',
    color: 'white',
  },
}));

export const Nav = styled('nav')(({ theme }) => ({
  width: '95%',
}));

export const menuTitleStyles = {
  width: '95%',
  margin: '18px auto 0 15px',
  textTransform: 'uppercase',
  color: (theme) => theme.palette.text.primary,
  fontSize: { xs: '1.6rem', sm: '2rem' },
  fontWeight: 500,
  fontFamily: 'Oswald, sans-serif',
};

export const listStyles = {
  width: { xs: 'calc(100vw - 20vw)', sm: '300px' },
};

export const listItemStyles = {
  '& .MuiTypography-root': {
    fontSize: { xs: '1.4rem', sm: '1.6rem' },
  },
};

// [theme.breakpoints.up("xs")]: {
//     minHeight: "calc(100vh - 90px)",
//   },
//   [theme.breakpoints.up("sm")]: {
//     minHeight: "calc(100vh - 138px)",
//   },
