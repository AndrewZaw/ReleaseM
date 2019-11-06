const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  hash: String,
  artists: Array
});

module.exports = { UserSchema };
