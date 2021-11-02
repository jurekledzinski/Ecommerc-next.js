import { connectDb } from '../../../utils/db';
import Brand from '../../../models/brands';

const handler = connectDb(async (req, res) => {
  try {
    const result = await Brand.find({});
    return res.status(200).json(result);
  } catch (error) {
    console.log(error, 'brands api');
  }
});

export default handler;
