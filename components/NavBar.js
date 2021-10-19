import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import {
  appBarStyles,
  boxWrapperStyles,
  navBarLogostyles,
} from "../muistyles/Navbar.styles";

import {
  signInBtnStyles,
  signUpStyles,
  toolbarNavStyles,
} from "../muistyles/ToolbarNavStyles";

const NavBar = ({ handleOpenSingInMenu, handleOpenSingUpMenu }) => {
  return (
    <AppBar sx={appBarStyles}>
      <Toolbar sx={toolbarNavStyles}>
        <Typography variant="h4" sx={navBarLogostyles}>
          Shoppy
        </Typography>
        <Box sx={boxWrapperStyles}>
          <Button
            variant="text"
            sx={signInBtnStyles}
            onClick={handleOpenSingInMenu}
          >
            Sign In
          </Button>
          <Button
            variant="text"
            sx={signUpStyles}
            onClick={handleOpenSingUpMenu}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
