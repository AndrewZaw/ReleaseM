const jwt = require('jsonwebtoken');
const getTokenSecret = require('./routes/api/methods/getTokenSecret');

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send();
  }
  try {
    const tokenSecret = getTokenSecret();
    const verified = jwt.verify(token, tokenSecret);
    req.user = verified;
  } catch (err) {
    res.statusMessage = 'InvalidToken';
    res.status(400).end();
  }
};

module.exports = verifyToken;
