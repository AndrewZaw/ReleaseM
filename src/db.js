const mongoose = require('mongoose');

const getURI = () => {
  const { mongoURI } = require('../config');
  return mongoURI;
};

const connectToDB = () => {
  mongoose
    .connect(getURI(), { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
};

module.exports = { connectToDB };
