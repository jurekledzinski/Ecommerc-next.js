import { connectDb } from '../../../../../utils/db';
import Product from '../../../../../models/products';

const handler = connectDb(async (req, res) => {
  const { category, brand, productId } = req.query;

  try {
    const result = await Product.find({ category, brand, _id: productId });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error, 'product api');
  }
});

export default handler;
