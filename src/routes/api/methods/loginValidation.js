const bcrypt = require('bcryptjs');

const validatePassword = async (passwordString, hash) => {
  const validPassword = await bcrypt.compare(passwordString, hash);
  return validPassword;
};

module.exports = validatePassword;
