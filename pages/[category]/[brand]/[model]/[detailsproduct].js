import cookie from 'cookie';
import Cookies from 'js-cookie';
import React, { useEffect, useContext } from 'react';

import { StoreContext } from '../../../../utils/store';
import {
  FETCH_DETAILS_PRODUCT,
  GET_REVIEW,
  USER_LOGIN_DATA,
  UPDATE_ON_STOCK_PRODUCT_DETAILS,
} from '../../../../utils/constants';
import DetailsPageProduct from '../../../../components/DetailsPageProduct';

const DetailsProduct = ({ detailsProduct, productReviews, user }) => {
  const {
    dispatchDetailsProduct,
    dispatchLoginUser,
    dispatchReview,
    stateCart,
  } = useContext(StoreContext);

  useEffect(() => {
    if (detailsProduct.name) {
      dispatchDetailsProduct({
        type: FETCH_DETAILS_PRODUCT,
        data: detailsProduct,
      });
    }
  }, [detailsProduct]);

  useEffect(() => {
    stateCart.products.forEach((item) => {
      dispatchDetailsProduct({
        type: UPDATE_ON_STOCK_PRODUCT_DETAILS,
        productId: item._id,
        updateOnStock: item.onStock,
      });
    });
  }, [detailsProduct]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatchLoginUser({ type: USER_LOGIN_DATA, data: user });
    }
  }, [dispatchLoginUser, user]);

  useEffect(() => {
    dispatchReview({ type: GET_REVIEW, data: productReviews });
  }, [productReviews]);

  useEffect(() => {
    window.onload = function () {
      Cookies.set('_ls', '1');
    };
  }, []);

  return (
    <div>
      <DetailsPageProduct />
    </div>
  );
};

export default DetailsProduct;

export async function getServerSideProps(context) {
  const { category, brand, id } = context.query;

  const response1 = await fetch(
    `http://localhost:3000/api/v1/${category}/${brand}/${id}`
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
    const dataDetails = await response1.json();
    const data = await response2.json();

    const [detailsProduct] = dataDetails;
    const { tokenAccess, user } = data;

    const response3 = await fetch(
      `http://localhost:3000/api/v1/reviews?productId=${detailsProduct._id}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenAccess}`,
        },
      }
    );
    const dataReviews = await response3.json();

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
        user: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar ? user.avatar : '',
          avatarId: user.avatarId ? user.avatarId : '',
        },
      };
    }

    return {
      props: {
        detailsProduct,
        productReviews: dataReviews.data || [],
        user: dataChange || {},
      },
    };
  } else {
    return {
      props: {
        detailsProduct: {},
        productReviews: [],
        user: {},
        error: {
          message: `Oops! ${response2.statusText}`,
          statusCode: response2.status,
        },
      },
    };
  }
}
