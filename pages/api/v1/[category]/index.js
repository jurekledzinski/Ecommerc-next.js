import { connectDb } from '../../../../utils/db';
import Product from '../../../../models/products';
import errorHandler from '../../../../helpers/api/error-handler';

const handler = connectDb(async (req, res) => {
  const { category } = req.query;

  try {
    const result = await Product.find({ category: category })
      .sort({ rate: 'desc' })
      .limit(4);
    return res.status(200).json(result);
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
