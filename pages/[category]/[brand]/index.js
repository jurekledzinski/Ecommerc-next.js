import cookie from 'cookie';
import Cookies from 'js-cookie';
import React, { useContext, useEffect } from 'react';
import Products from '../../../components/Products';

import { useRoutesHook } from '../../../customHooks/useRoutesHook';
import {
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
    stateLoginUser,
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

  useEffect(() => {
    window.onload = function () {
      Cookies.set('_ls', '1');
    };
  }, []);

  return <Products endpoints={endpoints} />;
};

export default ProductsListPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const { category, brand } = params;

  const response1 = await fetch(
    `http://localhost:3000/api/v1/${category}/${brand}`
  );

  const response2 = await fetch(
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

  if (response1.ok || response2.ok) {
    const dataProducts = await response1.json();
    const data = await response2.json();
    const { tokenAccess, user } = data;

    if (data.user) {
      context.res.setHeader(
        'Set-Cookie',
        cookie.serialize('refreshToken', user.tokenRefresh, {
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
