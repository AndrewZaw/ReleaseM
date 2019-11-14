const express = require('express');
const router = express.Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send('error');
      return err;
    }
    res.send({ users });
  });
});

router.post('/add', (req, res) => {
  const user = req.body.user;
  if (user.username && user.hash) {
    new User({ username: user.username, hash: user.hash })
      .save()
      .then(res.send(user));
  } else {
    res.send('error');
  }
});

module.exports = router;
