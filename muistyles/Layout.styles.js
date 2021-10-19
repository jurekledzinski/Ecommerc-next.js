import { styled } from "@mui/material/styles";

export const layoutContainerStyles = {
  maxWidth: "1200px",
  minHeight: { xs: "0vh", sm: "0vh" },
};

export const Image = styled("img")(({ theme }) => ({
  minWidth: "100%",
}));

export const wrapperTitleStyles = {
  margin: "20px auto 20px auto",
  maxWidth: "1200px",
  paddingLeft: "24px",
};

export const titleProductsStyles = {
  textTransform: "uppercase",
  fontWeight: 500,
  fontFamily: "Oswald, sans-serif",
  letterSpacing: 1,
};

export const wrapperButtonsStyles = {
  margin: "0 auto",
  maxWidth: { xs: "100%", sm: "1200px" },
  paddingLeft: { xs: "20px", sm: "24px" },
};

export const buttonGroupStyles = {
  minWidth: { xs: "initial", sm: "initial" },
  width: { xs: "calc(100% - 16px)", sm: "initial" },
};

export const buttonProductStyles = {
  width: { xs: "33.3%", sm: "initial" },
};
