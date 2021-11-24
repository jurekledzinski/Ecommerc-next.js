import cookie from 'cookie';
import React, { useContext, useEffect } from 'react';
import { USER_LOGIN_DATA } from '../../../utils/constants';

import { StoreContext } from '../../../utils/store';

import StepperBar from '../../../components/StepperBar';
import PlaceOrderComponent from '../../../components/PlaceOrder';
import FooterDown from '../../../components/FooterDown';

const PlaceOrder = ({ user }) => {
  const { stateLoginUser, dispatchLoginUser } = useContext(StoreContext);
  console.log(stateLoginUser, 'place order stateLoginUser');

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatchLoginUser({ type: USER_LOGIN_DATA, data: user });
    }
  }, [dispatchLoginUser, user]);

  return (
    <>
      <StepperBar />
      <PlaceOrderComponent />
    </>
  );
};

export default PlaceOrder;

PlaceOrder.getLayout = function PageLayout(page) {
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
