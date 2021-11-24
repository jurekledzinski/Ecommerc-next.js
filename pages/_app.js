import Error from 'next/error';
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
import Box from '@mui/material/Box';

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
import NotFoundPage from './404';
import ServerErrorPage from './500';

function MyApp({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (pageProps.error) {
    const { statusCode } = pageProps.error;
    switch (true) {
      case statusCode >= 400 && statusCode < 500:
        return (
          <NotFoundPage
            statusCode={pageProps.error.statusCode}
            title={pageProps.error.message}
          />
        );
      case statusCode >= 500 && statusCode < 600:
        return (
          <ServerErrorPage
            statusCode={pageProps.error.statusCode}
            title={pageProps.error.message}
          />
        );
      default:
        return (
          <NotFoundPage
            statusCode={pageProps.error.statusCode}
            title={pageProps.error.message}
          />
        );
    }
  }

  if (Component.getLayout) {
    return Component.getLayout(
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
              {loaded && <Component {...pageProps} />}
              {inputGlobalStyles}
            </Box>
          )}
        </ThemeMui>
      </StoreProvider>
    );
  }

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
