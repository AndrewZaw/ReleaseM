const Joi = require('@hapi/joi');

const validationSchema = Joi.object({
  username: Joi.string()
    .min(5)
    .required(),
  email: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .required()
});

module.exports = validationSchema.validate;
