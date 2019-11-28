const getTokenSecret = () => {
  if (process.env.tokenSecret) {
    return process.env.tokenSecret;
  } else {
    const config = require('../../../../config');
    return config.tokenSecret;
  }
};

module.exports = getTokenSecret;
