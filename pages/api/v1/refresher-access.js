import jwt from 'jsonwebtoken';
import { connectDb } from '../../../utils/db';
import User from '../../../models/user';

import errorHandler from '../../../helpers/api/error-handler';

const sendAccessToken = (req, res, tokenAccess, userUpdate) => {
  res.status(200).json({ tokenAccess, user: userUpdate });
};

const handler = connectDb(async (req, res) => {
  try {
    if (req.method === 'PATCH') {
      const cookieRefresh = JSON.parse(req.headers.cookie);
      const token = cookieRefresh._sp;

      if (!token) {
        throw 'Unauthorized';
      }

      let payload = jwt.verify(token, process.env.JWT_SECRET_REFRESH);

      const result = await User.findOne({ _id: payload.idUser });

      if (!result) {
        throw 'User not found';
      }

      if (result.tokenRefresh !== token) {
        throw 'Unauthorized';
      }

      const tokenAccess = result.createJWTokenAccess();
      const tokenRefresh = result.createJWTokenRefresh();

      const userUpdate = await User.findOneAndUpdate(
        { _id: payload.idUser },
        { tokenRefresh: tokenRefresh },
        { new: true }
      ).select(['_id', 'avatar', 'avatarId', 'name', 'tokenRefresh']);

      sendAccessToken(req, res, tokenAccess, userUpdate);
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
