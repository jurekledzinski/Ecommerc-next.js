const cookie = require('cookie');
import { connectDb } from '../../../utils/db';
import User from '../../../models/user';
import { isAuth } from '../../../helpers/api/auth-helper';

import errorHandler from '../../../helpers/api/error-handler';

const sendAccessToken = (res, tokenAccess, userUpdate) => {
  const msg = 'Login was successful';
  const dataReturn = { msgSuccess: msg, tokenAccess, user: userUpdate };
  return res.status(200).json(dataReturn);
};

const sendRefreshToken = (res, tokenRefresh) => {
  return res.setHeader(
    'Set-Cookie',
    cookie.serialize('_sp', tokenRefresh, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
    })
  );
};

const clearCookie = (res) => {
  return res.setHeader(
    'Set-Cookie',
    cookie.serialize('_sp', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0),
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

      const check = Boolean(req.cookies._sp) && Boolean(user.tokenRefresh);

      if (check && req.cookies._sp === user.tokenRefresh) {
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
    } else if (req.method === 'POST') {
      const idUser = isAuth(req);

      if (idUser) {
        clearCookie(res);
      }

      await User.findOneAndUpdate(
        { _id: idUser },
        { $set: { tokenRefresh: '', tokenAccessChangePassword: '' } },
        { upsert: true }
      );

      return res.status(200).json({ msgSuccess: 'You are logged out' });
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
