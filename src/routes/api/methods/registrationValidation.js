const Joi = require('@hapi/joi');

const validatePassword = user => {
  const validationSchema = Joi.object({
    username: Joi.string()
      .min(5)
      .required(),
    email: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .required()
  });

  return validationSchema.validate(user);
};

module.exports = validatePassword;
