const getClientIdAndSecret = () => {
  if (process.env.clientId) {
    const clientId = process.env.clientId;
    const clientSecret = process.env.clientSecret;
    return { clientId, clientSecret };
  } else {
    const { clientId } = require('../../../../config');
    const { clientSecret } = require('../../../../config');
    return { clientId, clientSecret };
  }
};

module.exports = getClientIdAndSecret();
