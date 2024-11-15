const cookie = require('cookie');
import React, { useContext, useEffect } from 'react';
import Products from '../../../components/Products';

import { useRoutesHook } from '../../../customHooks/useRoutesHook';
import {
  CLEAR_PRODUCTS_BRAND,
  FETCH_DATA_BRAND_PRODUCTS,
  USER_LOGIN_DATA,
  UPDATE_PRODUCTS_BRAND_ON_STOCK,
} from '../../../utils/constants';
import { StoreContext } from '../../../utils/store';

const ProductsListPage = ({ products, user }) => {
  const {
    dispatchLoginUser,
    disptachProductsBrand,
    stateCart,
    stateProductsBrand,
  } = useContext(StoreContext);
  const { endpoints } = useRoutesHook();

  const createCopyProducts = (data) => {
    let copyProductsArray = data.map((item) => {
      return {
        ...item,
        details: item.details.map((item1) => ({ ...item1 })),
        imagesSlider: item.imagesSlider.map((item2) => item2),
      };
    });

    return copyProductsArray;
  };

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatchLoginUser({ type: USER_LOGIN_DATA, data: user });
    }
  }, [dispatchLoginUser, user]);

  useEffect(() => {
    if (products.length > 0) {
      disptachProductsBrand({
        type: CLEAR_PRODUCTS_BRAND,
        data: [],
      });
      disptachProductsBrand({
        type: FETCH_DATA_BRAND_PRODUCTS,
        data: createCopyProducts(products),
      });
    }
  }, []);

  useEffect(() => {
    stateCart.products.forEach((item) => {
      disptachProductsBrand({
        type: UPDATE_PRODUCTS_BRAND_ON_STOCK,
        productId: item._id,
        amountOnStock: item.onStock,
      });
    });
  }, [stateProductsBrand.length]);

  return <Products endpoints={endpoints} />;
};

export default ProductsListPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const { category, brand } = params;
  const domainUrl = context.req.headers.host;

  const response1 = await fetch(
    `http://${domainUrl}/api/v1/${category}/${brand}`
  );

  const response2 = await fetch(`http://${domainUrl}/api/v1/refresher-access`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'applications/json',
      credentials: 'include',
      cookie: JSON.stringify(context.req.cookies),
    },
  });

  if (response1.ok || response2.ok) {
    const dataProducts = await response1.json();
    const data = await response2.json();
    const { tokenAccess, user } = data;

    if (data.user) {
      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('_sp', user.tokenRefresh, {
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
        products: dataProducts,
        user: dataChange || {},
      },
    };
  } else {
    return {
      props: {
        products: [],
        user: {},
        error: {
          message: `Oops! ${response2.statusText}`,
          statusCode: response2.status,
        },
      },
    };
  }
}
