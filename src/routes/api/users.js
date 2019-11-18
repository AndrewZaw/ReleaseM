const express = require('express');
const router = express.Router();
const { User } = require('../../models');

const createUserObject = user => ({ email: user.email, username: user.username, password: user.password });

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send('error');
      return err;
    }
    res.send({ users });
  });
});

router.post('/add', async (req, res) => {
  const user = req.body.user;
  if (user.email && user.username && user.password) {
    try {
      await User.create(createUserObject(user));
    } catch {
      res.send('error');
    }
    res.send(user);
    res.redirect('/login');
  }
});

module.exports = router;
