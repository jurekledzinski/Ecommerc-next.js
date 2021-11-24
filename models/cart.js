import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const cartSchema = new Schema({
  idUser: { type: String, required: [true, 'User id is required'] },
  products: {
    type: Array,
    required: [true, 'Products are required'],
  },
  totalCartAmount: {
    type: Number,
    required: [true, 'TotalCartAmount is required'],
  },
  totalCartPrice: {
    type: Number,
    required: [true, 'totalCartPrice is required'],
  },
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
