const express = require('express');
const app = express();
const path = require('path');
const { connectToDB } = require('./db.js');
const { User } = require('./models');

connectToDB();

app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return err;
    }
    res.send(users);
  });
});

app.post('/', (req, res) => {
  new User({ user: 'testUser', hash: 'testhash' }).save((err, user) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
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
