import React, { useContext, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import cookie from 'cookie';
import Layout from '../components/Layout';
import Box from '@mui/material/Box';
import BrandsProducts from '../components/BrandsProducts';
import CircularProgress from '@mui/material/CircularProgress';

import {
  SELECT_OPTION_MENU,
  USER_LOGIN_DATA,
  USER_DATA_CLEAR_PROFILE,
} from '../utils/constants';

import { StoreContext } from '../utils/store';

const Home = ({ brands, user, pageLoad }) => {
  const { dispatchLoginUser, disptachOpenDrawer, dispatchUserProfile } =
    useContext(StoreContext);
  const [pageLoading, setPageLoading] = useState(
    false || Boolean(Cookies.get('_ls'))
  );
  const idTimeout = useRef(null);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatchLoginUser({ type: USER_LOGIN_DATA, data: user });
      dispatchUserProfile({ type: USER_DATA_CLEAR_PROFILE, data: {} });
    }
  }, [dispatchLoginUser, user]);

  useEffect(() => {
    Cookies.remove('_mso');
    disptachOpenDrawer({ type: SELECT_OPTION_MENU, selectOption: 0 });

    window.onbeforeunload = function (e) {
      Cookies.remove('_ls');
    };
    window.onload = function () {
      idTimeout.current = setTimeout(() => {
        Cookies.set('_ls', '1');
        setPageLoading(pageLoad);
      }, 300);
    };

    return () => clearTimeout(idTimeout.current);
  }, []);

  return (
    <>
      {pageLoading ? (
        <Layout brandsProducts={brands}>
          <BrandsProducts brands={brands} />
        </Layout>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'white',
          }}
        >
          <Box>
            <CircularProgress sx={{ color: '#2196f3' }} thickness={2} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const domainUrl = context.req.headers.host;
  const response1 = await fetch(
    `https://${domainUrl}/api/v1/refresher-access`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'applications/json',
        credentials: 'include',
        cookie: JSON.stringify(context.req.cookies),
      },
    }
  );

  const response2 = await fetch(`https://${domainUrl}/api/v1/brands`);

  if (response1.ok || response2.ok) {
    const dataUser = await response1.json();
    const dataBrands = await response2.json();
    const { tokenAccess, user } = dataUser;

    if (dataUser.user) {
      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('_sp', dataUser.user.tokenRefresh, {
          httpOnly: true,
          path: '/',
          secure: process.env.NODE_ENV !== 'development',
        })
      );
    }

    let dataChange;
    if (dataUser.tokenAccess) {
      dataChange = {
        tokenAccess: tokenAccess,
        user: { _id: user._id, name: user.name },
      };
    }

    return {
      props: {
        brands: dataBrands,
        user: dataChange || {},
        pageLoad: true,
      },
    };
  } else {
    return {
      props: {
        pageLoad: true,
        brands: [],
        user: {},
        error: {
          message: `Oops! ${response1.statusText}`,
          statusCode: response1.status,
        },
      },
    };
  }
}
