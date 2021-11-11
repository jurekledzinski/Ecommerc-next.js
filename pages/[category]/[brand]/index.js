import React, { useContext, useEffect } from 'react';

import Products from '../../../components/Products';

import { useRoutesHook } from '../../../customHooks/useRoutesHook';
import {
  FETCH_DATA_BRAND_PRODUCTS,
  UPDATE_PRODUCTS_BRAND_ON_STOCK,
} from '../../../utils/constants';
import { StoreContext } from '../../../utils/store';

const ProductsListPage = ({ products }) => {
  const { disptachProductsBrand, stateCart, stateProductsBrand } =
    useContext(StoreContext);
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

  return <Products endpoints={endpoints} />;
};

export default ProductsListPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const { category, brand } = params;
  const response = await fetch(
    `http://localhost:3000/api/v1/${category}/${brand}`
  );
  const data = await response.json();

  return {
    props: {
      products: data,
    },
  };
}
