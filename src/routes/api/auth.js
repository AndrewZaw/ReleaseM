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

module.exports = router;
