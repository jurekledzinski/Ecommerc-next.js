import { styled } from "@mui/material/styles";

export const Section = styled("section")(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",
  [theme.breakpoints.up("xs")]: {
    minHeight: "calc(100vh - 90px)",
  },
  [theme.breakpoints.up("sm")]: {
    minHeight: "calc(100vh - 138px)",
  },
}));

export const BreadLink = styled("a")(({ theme }) => ({
  color: "#555555",
  textDecoration: "none",
  cursor: "pointer",
  [theme.breakpoints.up("xs")]: {
    fontSize: "1.4rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.6rem",
  },
  transition: "0.2s ease",
  ":hover": { color: "#1976d2" },
}));

export const containerProductsStyles = {
  padding: (theme) => theme.spacing(3),
};

export const productTitleStyles = {
  color: "black",
  textTransform: "uppercase",
  fontFamily: "Oswald, sans-serif",
  fontWeight: 500,
};

export const productBoxesStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "250px",
  background: "#fbfbfb",
  background:
    "-webkit-linear-gradient(to right, #fbfbfb, #f8f8f8, #ffffff, #fbfbfb)",
  background: "linear-gradient(to right, #fbfbfb, #f8f8f8, #ffffff, #fbfbfb)",
};

export const cardStyles = {
  height: "350px",
};

export const aTagStyles = {
  textDecoration: "none",
};

export const cardMediaStyles = {
  objectFit: "contain",
  width: "200px",
  height: "200px",
};

export const cardContentStyles = {
  height: "100px",
  padding: "5px",
};

export const boxWrapper = {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginTop: "20px",
};
