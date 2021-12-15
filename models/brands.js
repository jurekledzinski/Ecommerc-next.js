import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const brandsSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  icon: {
    type: String,
  },
  background: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

const Brand = mongoose.models.Brand || mongoose.model('Brand', brandsSchema);

export default Brand;
