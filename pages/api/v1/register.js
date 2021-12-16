import cookie from 'cookie';
import { connectDb } from '../../../utils/db';
import Order from '../../../models/order';
import User from '../../../models/user';
import {
  isAuth,
  isAuthUser,
  isAccessTokenChangePassword,
} from '../../../helpers/api/auth-helper';
import bcrypt from 'bcryptjs';
import errorHandler from '../../../helpers/api/error-handler';

const updatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const updatedPassword = await bcrypt.hash(password, salt);
  return updatedPassword;
};

const clearCookie = (res) => {
  return res.setHeader(
    'Set-Cookie',
    cookie.serialize('_sp', '', {
      httpOnly: true,
      path: '/',
      expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT'),
    })
  );
};

const handler = connectDb(async (req, res) => {
  const { email, name, surname, password } = req.body;
  const newUser = { name, surname, email, password };
  const { tokenUrl, tokenAccessChange } = req.query;

  const msg1 = 'Registration was successful';
  const msg2 = 'Password changed successfully';

  try {
    if (req.method === 'GET') {
      const email = isAuthUser(tokenUrl);

      const result = await User.findOne({ email }).select([
        '-_id',
        'tokenForgetPassword',
        'tokenAccessChangePassword',
      ]);

      if (result) {
        return res.status(200).json({
          data: result.tokenForgetPassword,
          dataAccess: result.tokenAccessChangePassword,
        });
      }
    } else if (req.method === 'PATCH') {
      const email = isAuthUser(tokenUrl);

      await User.findOneAndUpdate(
        { email },
        { $set: { tokenForgetPassword: '' } },
        { upsert: true }
      );

      return res.status(200).json({ data: '' });
    } else if (req.method === 'POST') {
      if (!email || !name || !surname || !password) {
        throw 'Credentials are required';
      }

      const result = await User.create(newUser);

      const userID = result._id;

      return res.status(200).json({ msgSuccess: msg1, data: userID });
    } else if (req.method === 'PUT') {
      const email = isAccessTokenChangePassword(tokenAccessChange);

      const newPassword = await updatePassword(password);

      const result = await User.findOneAndUpdate(
        { email },
        { password: newPassword, $set: { tokenAccessChangePassword: '' } },
        { upsert: true }
      );

      if (result) {
        return res.status(200).json({ msgSuccess: msg2 });
      }
    } else if (req.method === 'DELETE') {
      const userId = isAuth(req);

      if (Boolean(userId)) {
        clearCookie(res);
      }

      await User.findByIdAndDelete({ _id: userId });

      const count = await Order.countDocuments({ idUser: userId });

      if (count > 0) await Order.findOneAndDelete({ idUser: userId });

      return res.status(200).json({ msgSuccess: 'Account deleted' });
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
