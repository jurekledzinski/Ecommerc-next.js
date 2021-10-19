import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  Typography,
} from "@mui/material";

import {
  buttonGroupStyles,
  buttonProductStyles,
  layoutContainerStyles,
  titleProductsStyles,
  wrapperButtonsStyles,
  wrapperTitleStyles,
} from "../muistyles/Layout.styles";
import { Footer, FooterText } from "../muistyles/Footer.styles";

import NavBar from "./NavBar";
import MainSlider from "./MainSlider";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Layout = ({ children }) => {
  const [contentDrawer, setContentDrawer] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenSingInMenu = () => {
    setOpenDrawer(true);
    setContentDrawer(true);
  };

  const handleOpenSingUpMenu = () => {
    setOpenDrawer(true);
    setContentDrawer(false);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <div>
      <NavBar
        handleOpenSingInMenu={handleOpenSingInMenu}
        handleOpenSingUpMenu={handleOpenSingUpMenu}
      />
      <MainSlider />
      <Box sx={wrapperTitleStyles}>
        <Typography variant="h4" sx={titleProductsStyles}>
          Our Products
        </Typography>
      </Box>
      <Box sx={wrapperButtonsStyles}>
        <ButtonGroup
          size="large"
          aria-label="small button group"
          sx={buttonGroupStyles}
        >
          <Button variant="contained" sx={buttonProductStyles}>
            Phones
          </Button>
          <Button sx={buttonProductStyles}>Watches</Button>
          <Button sx={buttonProductStyles}>Tablets</Button>
        </ButtonGroup>
      </Box>
      <Container sx={layoutContainerStyles}>{children}</Container>
      <Footer>
        <FooterText>
          All rights reserved &copy; {new Date().getFullYear()}
        </FooterText>
      </Footer>
      <Drawer anchor={"right"} open={openDrawer} onClose={handleCloseDrawer}>
        {contentDrawer ? <SignInForm /> : <SignUpForm />}
      </Drawer>
    </div>
  );
};

export default Layout;
