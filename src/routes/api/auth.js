const express = require('express');
const router = express.Router();
const { User } = require('../../models');

const createUserObject = user => ({
  email: user.email,
  username: user.username,
  password: user.password
});

router.post('/register', async (req, res) => {
  const user = req.body.user;
  console.log(user);
  if (user.email && user.username && user.password) {
    try {
      await User.create(createUserObject(user));
      await console.log(user);
      await res.send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

module.exports = router;
