import { connectDb } from '../../../utils/db';
import Order from '../../../models/order';
import errorHandler from '../../../helpers/api/error-handler';
import { isAuth } from '../../../helpers/api/auth-helper';

const handler = connectDb(async (req, res) => {
  //   console.log(req.query.page.replace(/\_/g, ' '), 'order query');
  const userID = isAuth(req);
  try {
    if (req.method === 'GET') {
      const orderData = await Order.findOne({ idUser: userID });
      return res.status(200).json({ data: orderData });
    } else if (req.method === 'PATCH') {
      const checkIsOrderExist = await Order.findOne({ idUser: userID });

      if (!Boolean(checkIsOrderExist)) {
        const newOrder = await Order.create(req.body);

        return res.status(200).json({
          msgSuccess:
            Boolean(req.query.page) &&
            `${req.query.page.replace(/\_/, ' ')} added `,
          data: newOrder,
        });
      } else {
        const newOrder = await Order.findOneAndUpdate(
          { idUser: userID },
          req.body,
          { new: true }
        );

        return res.status(200).json({
          msgSuccess:
            Boolean(req.query.page) &&
            `${req.query.page.replace(/\_/, ' ')} added `,
          data: newOrder,
        });
      }
    } else if (req.method === 'PUT') {
      const newOrder = await Order.updateOne(
        { idUser: userID },
        {
          $addToSet: { allPaidOrders: req.body },
          $set: {
            name: '',
            surname: '',
            street: '',
            zipCode: '',
            city: '',
            country: '',
            deliveryMethod: '',
            deliveryPrice: 0,
            paymentMethod: '',
            isDelivered: false,
            termsConditions: false,
            timeDelivery: null,
            datePay: null,
            orderId: '',
            cart: { products: [], totalCartAmount: 0, totalCartPrice: 0 },
          },
        },
        { upsert: true }
      );

      return res.status(200).json({ msg: newOrder });
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
