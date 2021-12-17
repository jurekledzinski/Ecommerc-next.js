import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import NextNprogress from 'nextjs-progressbar';
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

  useEffect(() => {
    window.onload = function () {
      sessionStorage.setItem('_ls', '1');
    };
  }, []);

  if (pageProps.error) {
    const { statusCode } = pageProps.error;
    switch (true) {
      case statusCode >= 400 && statusCode < 500:
        return (
          <StoreProvider>
            <ThemeMui>
              {loaded && (
                <NotFoundPage
                  statusCode={pageProps.error.statusCode}
                  title={pageProps.error.message}
                />
              )}
              {inputGlobalStyles}
            </ThemeMui>
          </StoreProvider>
        );
      case statusCode >= 500 && statusCode < 600:
        return (
          <StoreProvider>
            <ThemeMui>
              {loaded && (
                <ServerErrorPage
                  statusCode={pageProps.error.statusCode}
                  title={pageProps.error.message}
                />
              )}
              {inputGlobalStyles}
            </ThemeMui>
          </StoreProvider>
        );
      default:
        return (
          <StoreProvider>
            <ThemeMui>
              {loaded && (
                <NotFoundPage
                  statusCode={pageProps.error.statusCode}
                  title={pageProps.error.message}
                />
              )}
              {inputGlobalStyles}
            </ThemeMui>
          </StoreProvider>
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
              <NextNprogress
                color="#0074d9"
                startPosition={0.3}
                stopDelayMs={200}
                height={2}
                showOnShallow={true}
                options={{ showSpinner: false }}
              />
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
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/images/favicon-16x16.png"
              />
            </Head>
            <NextNprogress
              color="#0074d9"
              startPosition={0.3}
              stopDelayMs={200}
              height={2}
              showOnShallow={true}
              options={{ showSpinner: false }}
            />
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
