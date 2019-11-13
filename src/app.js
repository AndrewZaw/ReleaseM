const express = require('express');
const app = express();
const path = require('path');
require('./db');
require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { User } = require('./models/user');

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
  const user = req.body.user;
  if (user.username && user.hash) {
    new User({ username: user.username, hash: user.hash }).save((err, user) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port);
