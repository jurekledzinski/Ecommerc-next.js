import { connectDb } from '../../../../utils/db';
import Product from '../../../../models/products';

const handler = connectDb(async (req, res) => {
  const { category } = req.query;

  try {
    const result = await Product.find({ category: category })
      .sort({ rate: 'desc' })
      .limit(4);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

export default handler;
