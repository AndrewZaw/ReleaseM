const mongoose = require('mongoose');

// Schemas
const { UserSchema } = require('./models/user');
mongoose.model('User', UserSchema);

const getURI = () => {
  const { mongoURI } = require('../config');
  return mongoURI;
};

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI || getURI(), {
      useNewUrlParser: true
    });
    await console.log('MongoDB Connected');
  } catch (err) {
    console.log(err);
  }
};

connectToDB();