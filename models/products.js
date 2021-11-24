import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const productSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
  },
  category: {
    type: String,
    required: [true, 'Category name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description product is required'],
  },
  imagesSlider: {
    type: Array,
    required: [true, 'Images slider are required'],
  },
  name: {
    type: String,
    required: [true, 'Name product is required'],
  },
  onStock: {
    type: Number,
    required: [true, 'Amount on stock is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price product is required'],
  },
  rate: {
    type: String,
    required: [true, 'Rate is required'],
  },
  details: {
    type: Array,
    required: [true, 'Details are required'],
  },
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
