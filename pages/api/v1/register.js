import { connectDb } from '../../../utils/db';
import User from '../../../models/user';
import errorHandler from '../../../helpers/api/error-handler';

const handler = connectDb(async (req, res) => {
  const { email, name, surname, password } = req.body;
  const newUser = { name, surname, email, password };
  const msg = 'Registration was successful';

  try {
    if (req.method === 'POST') {
      if (!email || !name || !surname || !password) {
        throw 'Credentials are required';
      }

      await User.create(newUser);
      return res.status(200).json({ msgSuccess: msg });
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
