const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    max: 255
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    min: 5,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024
  },
  artists: Array
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
