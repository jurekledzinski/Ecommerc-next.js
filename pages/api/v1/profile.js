import { connectDb } from '../../../utils/db';
import User from '../../../models/user';
import errorHandler from '../../../helpers/api/error-handler';
import { isAuth } from '../../../helpers/api/auth-helper';

const handler = connectDb(async (req, res) => {
  try {
    if (req.method === 'GET') {
      const idUser = isAuth(req);
      console.log(idUser, 'id user');
      const userData = await User.findOne({ _id: idUser }).select([
        '_id',
        'city',
        'country',
        'email',
        'name',
        'surname',
        'street',
        'zipCode',
      ]);

      if (idUser) {
        return res.status(200).json({ userData });
      }
    } else if (req.method === 'PATCH') {
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
