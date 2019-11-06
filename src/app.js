const path = require('path');
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
const mongoose = require('mongoose');
const { connectToDB } = require('./db');
connectToDB();
const User = mongoose.model('User');

app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send('error');
      return err;
    }
    res.send({ users });
  });
});

app.post('/api/users/add', (req, res) => {
  console.log(req.body);
  if (req.body.username && req.body.hash) {
    new User({ username: req.body.username, hash: req.body.hash }).save(
      (err, user) => {
        if (err) {
          console.log(err);
          res.redirect('/');
        }
      }
    );
  } else {
    res.redirect('/');
  }
});

app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port);
