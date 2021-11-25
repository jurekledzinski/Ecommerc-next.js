import { connectDb } from '../../../utils/db';
import User from '../../../models/user';
import errorHandler from '../../../helpers/api/error-handler';

const handler = connectDb(async (req, res) => {
  const { email, name, surname, password } = req.body;
  const newUser = { name, surname, email, password };
  const msg1 = 'Registration was successful';

  try {
    if (req.method === 'POST') {
      if (!email || !name || !surname || !password) {
        throw 'Credentials are required';
      }

      const result = await User.create(newUser);
      const userID = result._id;
      return res.status(200).json({ msgSuccess: msg1, data: userID });
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
