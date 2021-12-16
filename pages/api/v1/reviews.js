import { connectDb } from '../../../utils/db';
import Product from '../../../models/products';
import Review from '../../../models/reviews';
import errorHandler from '../../../helpers/api/error-handler';
import { isAuth } from '../../../helpers/api/auth-helper';

const likesUpdate = async (idUser, idReview) => {
  const result = await Review.aggregate([
    {
      $project: {
        isUserUpvote: {
          $in: [idUser, '$likesUsers'],
        },
      },
    },
  ]);

  const user = result.find((item) => item._id.toString() === idReview);
  return user.isUserUpvote;
};

const updateProductRate = async (productId) => {
  const resultReview = await Review.find({ productId: productId }).select([
    '-_id',
    'rate',
  ]);

  const initialValue = 0;
  const amountRates = resultReview.length;
  const sumRates = resultReview.reduce((prevValue, currentValue) => {
    return parseFloat(prevValue) + parseFloat(currentValue.rate);
  }, initialValue);

  const averageRate = sumRates / amountRates;

  let average = Number.isInteger(averageRate)
    ? averageRate
    : averageRate < Math.round(averageRate)
    ? Math.round(averageRate) - 0.5
    : Math.round(averageRate) + 0.5;

  const resultProduct = await Product.findOneAndUpdate(
    { _id: productId },
    { rate: isNaN(averageRate) ? '0' : average.toString() },
    {
      new: true,
      select: { rate: 1, _id: 0 },
    }
  );

  return resultProduct.rate;
};

const updateReview = async (req, res, idReview, productId) => {
  const { avatarImage, editRate, editReview, likes, name, userID } = req.body;
  const numberLikes = likes === 0 || likes ? likes + 1 : likes;

  const result = await Review.findOneAndUpdate(
    { _id: idReview },
    {
      $addToSet: { likesUsers: userID },
      avatarImage: avatarImage,
      likes: numberLikes,
      name: name,
      rate: editRate,
      review: editReview,
    },
    {
      new: true,
    }
  );

  if (result) {
    const msg = 'Review updated';
    const rateProduct = await updateProductRate(productId);
    return res.status(200).json({ data: result, msgSuccess: msg, rateProduct });
  }
};

const downVote = async (req, res, idReview, productId) => {
  const numberLikes = req.body.likes;

  const result = await Review.findOneAndUpdate(
    { _id: productId },
    { $pull: { likesUsers: idReview }, likes: numberLikes - 1 },
    {
      new: true,
    }
  );

  if (result) {
    return res.status(200).json({ data: result, msgSuccess: 'Review updated' });
  }
};

const handler = connectDb(async (req, res) => {
  const { aim, idReview, productId } = req.query;

  try {
    if (req.method === 'GET') {
      const result = await Review.find({
        productId: productId,
      });
      if (result) return res.status(200).json({ data: result });
    } else if (req.method === 'POST') {
      const idUser = isAuth(req);
      const reviewCheck = await Review.find({
        userId: idUser,
        productId: productId,
      });
      if (reviewCheck.length === 0) {
        const result = await Review.create(req.body);
        const rateProduct = await updateProductRate(productId);
        const msg = 'Review added';
        return res
          .status(200)
          .json({ data: result, msgSuccess: msg, rateProduct });
      } else {
        throw 'You already review to this product';
      }
    } else if (req.method === 'PATCH') {
      const idUser = isAuth(req);
      switch (aim) {
        case 'updateLikes':
          const isUserUpVote = await likesUpdate(idUser, idReview);
          if (isUserUpVote) {
            return await downVote(req, res, idUser, idReview);
          }
        default:
          await updateReview(req, res, idReview, productId);
          break;
      }
    } else if (req.method === 'DELETE') {
      const result = await Review.findByIdAndDelete({
        _id: idReview,
      });

      if (result) {
        const msg = 'Review removed';
        const rateProduct = await updateProductRate(productId);
        return res.status(200).json({ msgSuccess: msg, rateProduct });
      }
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
