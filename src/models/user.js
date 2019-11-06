const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  hash: String,
  artists: Array
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
