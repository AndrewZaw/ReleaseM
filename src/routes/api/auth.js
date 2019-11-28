const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const registrationValidation = require('./methods/registrationValidation');
const loginValidation = require('./methods/loginValidation');
const hashPassword = require('./methods/hashPassword');
const bcrypt = require('bcryptjs');

const createUserObject = (username, password, email) => ({
  email,
  username,
  password
});

router.post('/register', async (req, res) => {
  const user = req.body.user;
  const { error } = registrationValidation(user);
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
      const hashedPassword = hashPassword(user.password);
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

router.post('/login', async (req, res) => {
  const user = req.body.user;
  User.findOne({ username: user.username }, async (err, foundUser) => {
    console.log(foundUser);
    if (foundUser) {
      const validPassword = await bcrypt.compare(
        user.password,
        foundUser.password
      );
      if (validPassword) {
        res.send({ username: user.username });
      } else {
        res.statusMessage = 'Invalid username/password combination';
        res.status(400).end();
      }
    } else {
      res.statusMessage = 'Invalid username/password combination';
      res.status(400).end();
    }
  });
});

module.exports = router;
