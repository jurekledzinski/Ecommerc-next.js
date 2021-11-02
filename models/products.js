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
  imageSrc: {
    type: String,
    required: [true, 'Image main src product is required'],
  },
  imagesSrcSet: {
    type: Array,
    required: [true, 'Image srcset product is required'],
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
  sizes: {
    type: Array,
    required: [true, 'Sizes of image are required'],
  },
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
