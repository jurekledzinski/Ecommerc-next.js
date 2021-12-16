import cookie from 'cookie';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { CLEAR_CART, USER_LOGIN_DATA } from '../../utils/constants';

import { StoreContext } from '../../utils/store';

import {
  addPaidOrder,
  getOrderDetails,
  sendEmail,
  updateProductsStock,
} from '../../helpers/client/apiHelpers';

import SuccessPaidOrder from '../../components/SuccessPaidOrder';
import SnackBarMessage from '../../components/SnackBarMessage';

const SuccessOrder = ({ user }) => {
  const { stateLoginUser, dispatchCart, dispatchLoginUser } =
    useContext(StoreContext);
  const { tokenAccess } = stateLoginUser;
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [emailReceive, setEmailReceive] = useState(false);
  const [orderState, setOrderState] = useState({});

  const sendSuccessEmail = async (orderData) => {
    const result = await sendEmail(
      '/api/v1/email',
      orderData,
      tokenAccess,
      setErrorMsg
    );

    if (Boolean(result.msgSuccess)) {
      setSuccessMsg(result.msgSuccess);
      setEmailReceive(true);
    }
  };

  const copyOrderPaid = (result) => {
    let copy;
    if (Object.keys(result).length > 0) {
      copy = {
        ...result,
        cart: {
          ...result.cart,
          products: result.cart.products.map((item) => ({
            ...item,
            details: item.details.map((item1) => ({ ...item1 })),
            imagesSlider: item.imagesSlider.map((item2) => item2),
          })),
        },
        datePay: new Date(),
        isPaid: true,
        isDelivered: false,
      };
    }
    delete copy.allPaidOrders;
    delete copy.__v;
    delete copy._id;
    return { orderCopy: copy };
  };

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatchLoginUser({ type: USER_LOGIN_DATA, data: user });
    }
  }, [dispatchLoginUser, user]);

  useEffect(() => {
    if (tokenAccess) {
      const fetchDetailsOrder = async () => {
        const result = await getOrderDetails(
          '/api/v1/order',
          tokenAccess,
          setErrorMsg
        );

        if (result?.data) {
          const { orderCopy } = copyOrderPaid(result.data);
          if (orderCopy.cart.products.length > 0) {
            setOrderState(orderCopy);
          }
        }
      };

      fetchDetailsOrder();
    }
  }, [stateLoginUser]);

  useEffect(() => {
    if (Object.keys(orderState).length > 0) {
      const paidOrderAdd = async () => {
        await addPaidOrder(
          '/api/v1/order',
          orderState,
          tokenAccess,
          setErrorMsg
        );
      };
      paidOrderAdd();
    }
  }, [orderState]);

  useEffect(() => {
    if (Object.keys(orderState).length > 0) {
      const updateProducts = async () => {
        const result = await updateProductsStock(
          '/api/v1/products',
          orderState,
          tokenAccess,
          setErrorMsg
        );
        if (Object.keys(result.data).length > 0) {
          dispatchCart({ type: CLEAR_CART });
          Cookies.remove('check');
          Cookies.remove('step');
          sendSuccessEmail({ ...result, purpose: 'successOrder' });
        }
      };

      updateProducts();
    }
  }, [orderState]);

  useEffect(() => {
    window.onload = function () {
      Cookies.set('_ls', '1');
    };
  }, []);

  return (
    <>
      <SnackBarMessage
        errorMsg={errorMsg}
        successMsg={successMsg}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
      <SuccessPaidOrder emailReceive={emailReceive} />
    </>
  );
};

export default SuccessOrder;

SuccessOrder.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

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
