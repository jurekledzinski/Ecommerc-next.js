import bcrypt from 'bcryptjs';
import { connectDb } from '../../../utils/db';
import User from '../../../models/user';
import errorHandler from '../../../helpers/api/error-handler';
import { isAuth } from '../../../helpers/api/auth-helper';

const updatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const updatedPassword = await bcrypt.hash(password, salt);
  return updatedPassword;
};

const handler = connectDb(async (req, res) => {
  const idUser = isAuth(req);

  try {
    if (req.method === 'GET') {
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
      const updateData = {
        city: req.body.city,
        country: req.body.country,
        email: req.body.email,
        name: req.body.name,
        password:
          req.body.password && (await updatePassword(req.body.password)),
        street: req.body.street,
        surname: req.body.surname,
        zipCode: req.body.zipCode,
      };

      const userData = await User.findByIdAndUpdate(
        { _id: idUser },
        updateData,
        {
          new: true,
        }
      );

      return res
        .status(200)
        .json({ data: userData, msgSuccess: 'Update was successful' });
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
