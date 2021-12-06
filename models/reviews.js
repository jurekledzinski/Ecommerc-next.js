import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name user is required'],
    },
    avatarImage: {
      type: String,
      required: false,
    },
    rate: {
      type: String,
      required: [true, 'Rate is required'],
    },
    review: {
      type: String,
      required: [true, 'Review is required'],
    },
    likes: {
      type: Number,
      required: false,
    },
    likesUsers: { type: Array, required: false },
    productId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
