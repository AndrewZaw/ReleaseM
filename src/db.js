const mongoose = require('mongoose');

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