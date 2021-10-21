import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";

import {
  buttonGroupStyles,
  buttonProductStyles,
  layoutContainerStyles,
  titleProductsStyles,
  wrapperButtonsStyles,
  wrapperTitleStyles,
} from "../muistyles/Layout.styles";

import MainSlider from "./MainSlider";

const Layout = ({ children }) => {
  return (
    <div>
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
    </div>
  );
};

export default Layout;
