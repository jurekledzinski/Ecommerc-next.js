import { connectDb } from '../../../../utils/db';
import Product from '../../../../models/products';

const handler = connectDb(async (req, res) => {
  const { category, brand } = req.query;
  console.log(req.query, ' req.query products');
  console.log(req.params, ' req.params products');
  try {
    const result = await Product.find({ category: category, brand: brand });
    return res.status(200).json(result);
  } catch (error) {
    console.log('Error products list api');
  }
});

export default handler;
