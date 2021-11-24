import { connectDb } from '../../../utils/db';
import Cart from '../../../models/cart';
import Product from '../../../models/products';
import errorHandler from '../../../helpers/api/error-handler';
import { isAuth } from '../../../helpers/api/auth-helper';

const checkPricesProducts = async (body) => {
  const onlyIdsProducts = body.products.map((item) => item._id);
  const foundProducts = await Product.find().where('_id').in(onlyIdsProducts);
  const checkProducts = body.products.map((item1) => {
    const single = foundProducts.find(
      (item2) => item1._id === item2._id.toString()
    );
    return {
      ...item1,
      price: single.price,
      amount: single.onStock,
      totalPrice: Math.abs((item1.amount - item1.onStock) * single.price),
    };
  });

  const initialValueAmount = 0;

  const totalAmount = checkProducts.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.amount - currentValue.onStock;
  }, initialValueAmount);

  const initalValue = 0;

  const totalPriceOrder = checkProducts.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.totalPrice;
  }, initalValue);

  const checkedCart = {
    idUser: body.idUser,
    products: checkProducts,
    totalCartAmount: totalAmount,
    totalCartPrice: totalPriceOrder,
  };

  return checkedCart;
};

const handler = connectDb(async (req, res) => {
  const userID = isAuth(req);
  console.log(userID, 'auth token bearer');
  try {
    if (req.method === 'GET') {
      const cartFound = await Cart.findOne({ idUser: userID }).select([
        'products',
        'totalCartAmount',
        'totalCartPrice',
        '-_id',
      ]);
      return res.status(200).json({ data: cartFound });
    } else if (req.method === 'PATCH') {
      const checkIsCartExist = await Cart.findOne({ idUser: userID });
      const cartChecked = await checkPricesProducts(req.body);

      if (!Boolean(checkIsCartExist)) {
        const newCart = await Cart.create(cartChecked).select([
          'products',
          'totalCartAmount',
          'totalCartPrice',
          '-_id',
        ]);
        return res.status(200).json({ data: newCart });
      } else {
        const newCart = await Cart.findOneAndUpdate(
          { idUser: userID },
          cartChecked,
          { new: true }
        ).select(['products', 'totalCartAmount', 'totalCartPrice', '-_id']);
        return res.status(200).json({ data: newCart });
      }
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
