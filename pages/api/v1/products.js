import { connectDb } from '../../../utils/db';
import Product from '../../../models/products';
import errorHandler from '../../../helpers/api/error-handler';

const handler = connectDb(async (req, res) => {
  const products = req.body.cart.products;
  try {
    if (req.method === 'PATCH') {
      products.forEach(async (item) => {
        await Product.findByIdAndUpdate(
          { _id: item._id },
          { onStock: item.onStock }
        );
      });

      return res.status(200).json({ data: req.body });
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
