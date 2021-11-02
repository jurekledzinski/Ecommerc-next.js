import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import {
  appWrapperStyles,
  bodyStyles,
  globalStyles,
  htmlStyles,
} from '../muistyles/Global.styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Box } from '@mui/material';

import StoreProvider from '../utils/store';

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      '*': globalStyles,
      html: htmlStyles,
      body: bodyStyles,
    }}
  />
);

import NavBar from '../components/NavBar';
import FooterDown from '../components/FooterDown';
import AsideDrawer from '../components/AsideDrawer';
import ThemeMui from '../components/ThemeMui';

function MyApp({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <StoreProvider>
      <ThemeMui>
        {loaded && (
          <Box sx={appWrapperStyles}>
            <Head>
              <title>Shoppy</title>
              <meta
                name="description"
                content="Buy phones, watches, tablets in good and cheap price"
              />
            </Head>
            {loaded && <NavBar />}
            {loaded && <Component {...pageProps} />}
            <FooterDown />
            <AsideDrawer />

            {inputGlobalStyles}
          </Box>
        )}
      </ThemeMui>
    </StoreProvider>
  );
}

export default MyApp;
