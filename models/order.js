import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const orderSchema = new Schema({
  cart: {
    type: Object,
    required: false,
  },
  deliveryMethod: {
    type: String,
    required: false,
  },
  deliveryPrice: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  timeDelivery: {
    type: Number,
    required: false,
  },
  isDelivered: {
    type: Boolean,
    required: false,
  },
  dateDelivery: {
    type: Date,
    required: false,
  },
  paymentMethod: {
    type: String,
    required: false,
  },
  datePay: {
    type: Date,
    required: false,
  },
  isPaid: {
    type: Boolean,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  surname: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: false,
  },
  zipCode: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  termsConditions: {
    type: Boolean,
    required: false,
  },
  idUser: {
    type: String,
    required: false,
  },
  orderId: {
    type: String,
    required: false,
  },
  stripeOrderId: {
    type: String,
    required: false,
  },
  allPaidOrders: {
    type: Array,
    required: false,
  },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
