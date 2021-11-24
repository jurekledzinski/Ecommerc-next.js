import React, { useContext, useEffect } from 'react';
import cookie from 'cookie';
import Layout from '../components/Layout';
import BrandsProducts from '../components/BrandsProducts';

import { USER_LOGIN_DATA, USER_DATA_CLEAR_PROFILE } from '../utils/constants';

import { StoreContext } from '../utils/store';

const Home = ({ brands, user }) => {
  const { dispatchLoginUser, dispatchUserProfile, stateUserProfile } =
    useContext(StoreContext);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatchLoginUser({ type: USER_LOGIN_DATA, data: user });
      dispatchUserProfile({ type: USER_DATA_CLEAR_PROFILE, data: {} });
    }
  }, [dispatchLoginUser, user]);

  return (
    <Layout>
      <BrandsProducts brands={brands} />
    </Layout>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const response1 = await fetch(
    'http://localhost:3000/api/v1/refresher-access',
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

  const response2 = await fetch('http://localhost:3000/api/v1/brands');

  if (response1.ok || response2.ok) {
    const dataUser = await response1.json();
    const dataBrands = await response2.json();
    const { tokenAccess, user } = dataUser;

    if (dataUser.user) {
      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('refreshToken', dataUser.user.tokenRefresh, {
          httpOnly: true,
          path: '/',
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
      },
    };
  } else {
    return {
      props: {
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
