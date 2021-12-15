import cookie from 'cookie';
import Cookies from 'js-cookie';
import React, { useContext, useEffect } from 'react';
import { USER_LOGIN_DATA } from '../../utils/constants';

import { StoreContext } from '../../utils/store';

import StepperBar from '../../components/StepperBar';
import OrderShippingForm from '../../components/OrderShippingForm';
import FooterDown from '../../components/FooterDown';

const Shipping = ({ user }) => {
  const { stateLoginUser, dispatchLoginUser } = useContext(StoreContext);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatchLoginUser({ type: USER_LOGIN_DATA, data: user });
    }
  }, [dispatchLoginUser, user]);

  useEffect(() => {
    window.onload = function () {
      Cookies.set('_ls', '1');
    };
  }, []);

  return (
    <>
      <StepperBar />
      <OrderShippingForm />
    </>
  );
};

export default Shipping;

Shipping.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
      <FooterDown />
    </>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch(
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

  if (response.ok) {
    const data = await response.json();
    const { tokenAccess, user } = data;

    if (data.user) {
      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('refreshToken', data.user.tokenRefresh, {
          httpOnly: true,
          path: '/',
          secure: process.env.NODE_ENV !== 'development',
        })
      );
    }

    let dataChange;
    if (data.tokenAccess) {
      dataChange = {
        tokenAccess: tokenAccess,
        user: { _id: user._id, name: user.name },
      };
    }

    return {
      props: {
        user: dataChange || {},
      },
    };
  } else {
    return {
      props: {
        user: {},
        error: {
          message: `Oops! ${response.statusText}`,
          statusCode: response.status,
        },
      },
    };
  }
}
