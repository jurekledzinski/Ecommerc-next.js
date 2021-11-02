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
    required: [true, 'Background color is required'],
  },
});

const Brand = mongoose.models.Brand || mongoose.model('Brand', brandsSchema);

export default Brand;
