const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const validate = require('./methods/validation');

const createUserObject = (username, password, email) => ({
  email,
  username,
  password
});

router.post('/register', async (req, res) => {
  const user = req.body.user;
  const { error } = validate(user);
  const usernameExists = await User.findOne({ username: user.username });
  const emailExists = await User.findOne({ email: user.email });
  if (usernameExists) {
    res.statusMessage = 'Username already exists';
    res.status(400).end();
  } else if (emailExists) {
    res.statusMessage = 'Email already exists';
    res.status(400).end();
  } else if (error) {
    res.statusMessage = error.details[0].message;
    res.status(400).end();
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      await User.create(
        createUserObject(user.username, hashedPassword, user.email)
      );
      await console.log(user);
      await res.send({ user: user.username, email: user.email });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.post('/login', async (req, res) => {});

module.exports = router;
