import React, { useEffect, useContext } from 'react';

import { StoreContext } from '../../../../utils/store';
import {
  FETCH_DETAILS_PRODUCT,
  UPDATE_ON_STOCK_PRODUCT_DETAILS,
} from '../../../../utils/constants';
import DetailsPageProduct from '../../../../components/DetailsPageProduct';

const DetailsProduct = ({ detailsProduct }) => {
  const { dispatchDetailsProduct, stateCart } = useContext(StoreContext);

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

  return (
    <div>
      <DetailsPageProduct />
    </div>
  );
};

export default DetailsProduct;

export async function getServerSideProps(context) {
  const { category, brand, id } = context.query;
  const response = await fetch(
    `http://localhost:3000/api/v1/${category}/${brand}/${id}`
  );
  const data = await response.json();
  const [detailsProduct] = data;

  //   console.log(detailsProduct, 'data check details page');

  return {
    props: {
      detailsProduct,
    },
  };
}
