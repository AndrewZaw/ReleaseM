const mongoose = require('mongoose');
const User = require('./models/user');

const getURI = () => {
  const { mongoURI } = require('../config');
  return mongoURI;
};

const uri = getURI();

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(db => console.log(db))
  .catch(err => console.log(err));
