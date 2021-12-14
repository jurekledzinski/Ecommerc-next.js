import { connectDb } from '../../../utils/db';
import Product from '../../../models/products';
import errorHandler from '../../../helpers/api/error-handler';
import { isAuth } from '../../../helpers/api/auth-helper';

const handler = connectDb(async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { data } = req.body;

      const result = data.map(async (item) => {
        return await Product.find({
          _id: item._id,
          $or: [
            { onStock: { $lt: item.amount - item.onStock } },
            { onStock: { $eq: 0 } },
          ],
        });
      });

      const productsData = await Promise.all(result);

      let changeProducts = productsData.map((item) => {
        const singleObj = item.length !== 0 && item[0];
        return singleObj ? singleObj : item;
      });

      const filterProducts = changeProducts.filter(
        (item) => !Array.isArray(item)
      );

      return res.status(200).json({ data: filterProducts });
    } else if (req.method === 'PATCH') {
      const products = req.body.cart.products;
      const idUser = isAuth(req);
      if (idUser) {
        products.forEach(async (item) => {
          await Product.findByIdAndUpdate(
            { _id: item._id },
            { onStock: item.onStock }
          );
        });

        return res.status(200).json({ data: req.body });
      }
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
