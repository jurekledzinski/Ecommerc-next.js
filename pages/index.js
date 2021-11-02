import Layout from '../components/Layout';
import BrandsProducts from '../components/BrandsProducts';

const Home = ({ brands }) => {
  return (
    <Layout>
      <BrandsProducts brands={brands} />
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/v1/brands');
  const data = await response.json();

  return {
    props: {
      brands: data,
    },
  };
}
