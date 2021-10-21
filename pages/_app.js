import Head from "next/head";
import "../styles/globals.css";
import {
  bodyStyles,
  globalStyles,
  htmlStyles,
} from "../muistyles/Global.styles";

import GlobalStyles from "@mui/material/GlobalStyles";

import StoreProvider from "../uitils/store";

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      "*": globalStyles,
      html: htmlStyles,
      body: bodyStyles,
    }}
  />
);

import NavBar from "../components/NavBar";
import FooterDown from "../components/FooterDown";
import AsideDrawer from "../components/AsideDrawer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shoppy</title>
        <meta
          name="description"
          content="Buy phones, watches, tablets in good and cheap price"
        />
      </Head>
      <StoreProvider>
        <NavBar />
        <Component {...pageProps} />
        <FooterDown />
        <AsideDrawer />
      </StoreProvider>
      {inputGlobalStyles}
    </>
  );
}

export default MyApp;
