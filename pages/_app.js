import Head from "next/head";
import "../styles/globals.css";
import {
  bodyStyles,
  globalStyles,
  htmlStyles,
} from "../muistyles/Global.styles";

import GlobalStyles from "@mui/material/GlobalStyles";

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      "*": globalStyles,
      html: htmlStyles,
      body: bodyStyles,
    }}
  />
);

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
      <Component {...pageProps} />
      {inputGlobalStyles}
    </>
  );
}

export default MyApp;
