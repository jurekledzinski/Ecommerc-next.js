const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { connectDb } from '../../utils/db';
import errorHandler from '../../helpers/api/error-handler';
import { isAuth } from '../../helpers/api/auth-helper';

const handler = connectDb(async (req, res) => {
  const domainURL = req.headers.host;
  const idUser = isAuth(req);
  const nameDelivery = req.body.deliveryName;
  const priceDelivery = req.body.deliveryPrice;
  const productsOrdered = req.body.products;
  const timeDelivery = req.body.deliveryTime;
  const orderID = req.body.orderId;

  const handleStripeCheckout = async () => {
    const changedProducts = productsOrdered.map((item) => {
      return {
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.name,
            description: item.description,
            images: [item.imagesSlider[0]],
          },
        },
        quantity: item.amount - item.onStock,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [...changedProducts],
      mode: 'payment',
      payment_method_types: ['card'],
      client_reference_id: orderID,
      success_url: `http://${domainURL}/success/order?id=${orderID}`,
      cancel_url: `http://${domainURL}/cancel/order?id=${orderID}`,
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: Math.round(priceDelivery * 100),
              currency: 'eur',
            },
            display_name: nameDelivery,
            delivery_estimate: {
              maximum: {
                unit: 'business_day',
                value: timeDelivery,
              },
            },
          },
        },
      ],
    });

    return session;
  };

  try {
    if (req.method === 'GET') {
      if (idUser) {
        return res
          .status(200)
          .json({ key: process.env.STRIPE_PUBLISHABLE_KEY });
      }
    } else if (req.method === 'POST') {
      if (idUser) {
        const session = await handleStripeCheckout();
        return res.status(200).json({ sessionId: session.id });
      }
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
