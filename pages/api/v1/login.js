import cookie from 'cookie';
import { connectDb } from '../../../utils/db';
import User from '../../../models/user';

import errorHandler from '../../../helpers/api/error-handler';

const sendAccessToken = (res, tokenAccess, userUpdate) => {
  const msg = 'Login was successful';
  const dataReturn = { msgSuccess: msg, tokenAccess, user: userUpdate };
  return res.status(200).json(dataReturn);
};

const sendRefreshToken = (res, tokenRefresh) => {
  return res.setHeader(
    'Set-Cookie',
    cookie.serialize('refreshToken', tokenRefresh, {
      httpOnly: true,
      path: '/',
    })
  );
};

const handler = connectDb(async (req, res) => {
  const { email, password } = req.body;

  try {
    if (req.method === 'PATCH') {
      if (!email || !password) {
        throw 'Credentials are required';
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw 'User not found';
      }

      const check =
        Boolean(req.cookies.refreshToken) && Boolean(user.tokenRefresh);

      if (check && req.cookies.refreshToken === user.tokenRefresh) {
        throw 'You are already logged in';
      }

      const isPasswordCorrect = await user.comparePasswords(password);

      if (!isPasswordCorrect) {
        throw 'Invalid credentials';
      }

      const tokenRefresh = user.createJWTokenRefresh();
      const tokenAccess = user.createJWTokenAccess();

      const userUpdate = await User.findOneAndUpdate(
        { email },
        { tokenRefresh: tokenRefresh },
        { new: true }
      ).select(['avatar', '_id', 'name']);

      sendRefreshToken(res, tokenRefresh);
      sendAccessToken(res, tokenAccess, userUpdate);
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
