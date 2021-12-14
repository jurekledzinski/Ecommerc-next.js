import { connectDb } from '../../../utils/db';
import Brand from '../../../models/brands';
import errorHandler from '../../../helpers/api/error-handler';

const handler = connectDb(async (req, res) => {
  try {
    const result = await Brand.find({});
    return res.status(200).json(result);
  } catch (error) {
    errorHandler(error, res);
  }
});

export default handler;
