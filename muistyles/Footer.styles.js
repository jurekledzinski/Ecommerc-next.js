import { alpha, styled } from "@mui/material/styles";

export const Footer = styled("footer")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50px",
  backgroundColor: "#444444",
}));

export const FooterText = styled("p")(({ theme }) => ({
  color: "white",
  fontWeight: 300,
  letterSpacing: 1,
  [theme.breakpoints.up("xs")]: {
    fontSize: "14px",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "16px",
  },
}));
