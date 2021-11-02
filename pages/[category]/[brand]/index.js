import Products from '../../../components/Products';

import { useRoutesHook } from '../../../customHooks/useRoutesHook';

const ProductsListPage = ({ products }) => {
  const { endpoints } = useRoutesHook();
  console.log(endpoints);
  return <Products data={products} endpoints={endpoints} />;
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
