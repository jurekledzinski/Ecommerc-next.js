import mongoose from 'mongoose';

export const connectDb = (fn) => {
  return async (req, res) => {
    try {
      if (mongoose.connections[0].readyState) {
        return await fn(req, res);
      }

      await mongoose.connect(process.env.ATLAS_URL);
      return await fn(req, res);
    } catch (error) {
      console.log(error, 'error connect baza danych');
    }
  };
};
