import cookie from 'cookie';
import React, { useContext, useEffect } from 'react';

import { ADD_ORDERS_USER, USER_LOGIN_DATA } from '../../utils/constants';

import { StoreContext } from '../../utils/store';

import PaidOrdersUser from '../../components/PaidOrdersUser';

const OrdersUser = ({ ordersUser, user }) => {
  const { dispatchLoginUser, dispatchOrdersUser } = useContext(StoreContext);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatchLoginUser({ type: USER_LOGIN_DATA, data: user });
    }
  }, [dispatchLoginUser, user]);

  useEffect(() => {
    if (ordersUser) {
      dispatchOrdersUser({ type: ADD_ORDERS_USER, data: ordersUser });
    }
  }, []);

  return <PaidOrdersUser />;
};

export default OrdersUser;

export async function getServerSideProps(context) {
  const domainUrl = context.req.headers.host;
  const response = await fetch(`https://${domainUrl}/api/v1/refresher-access`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'applications/json',
      credentials: 'include',
      cookie: JSON.stringify(context.req.cookies),
    },
  });

  if (response.ok) {
    const data = await response.json();
    const { tokenAccess, user } = data;

    const responseOrders = await fetch(`https://${domainUrl}/api/v1/order`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${tokenAccess}`,
      },
    });

    const dataOrdersUser = await responseOrders.json();

    if (data.user) {
      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('_sp', data.user.tokenRefresh, {
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
        ordersUser: dataOrdersUser.data.allPaidOrders,
        user: dataChange || {},
      },
    };
  } else {
    return {
      props: {
        ordersUser: [],
        user: {},
        error: {
          message: `Oops! ${response.statusText}`,
          statusCode: response.status,
        },
      },
    };
  }
}
