import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    required: [true, 'Name is required'],
  },
  surname: {
    type: String,
    required: [true, 'Surname is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  tokenRefresh: {
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
});

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWTokenRefresh = function () {
  return jwt.sign({ idUser: this._id }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: process.env.JWT_LIFETIME_REFRESH,
  });
};

userSchema.methods.createJWTokenAccess = function () {
  return jwt.sign({ idUser: this._id }, process.env.JWT_SECRET_ACCESS, {
    expiresIn: process.env.JWT_LIFETIME_ACCESS,
  });
};

userSchema.methods.comparePasswords = async function (loginPassword) {
  const isMatchPassword = await bcrypt.compare(loginPassword, this.password);
  return isMatchPassword;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
