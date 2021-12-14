import { connectDb } from '../../../../../utils/db';
import Product from '../../../../../models/products';
import errorHandler from '../../../../../helpers/api/error-handler';

const handler = connectDb(async (req, res) => {
  const { category, brand } = req.query;
  try {
    const result = await Product.find({ category: category, brand: brand });
    return res.status(200).json(result);
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
