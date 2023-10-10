const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  username: Joi.string().trim().required(),
  password: Joi.string()
    .pattern(/^[a-zA-z0-9]{6,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .strip(),
  email: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
});
exports.registerSchema = registerSchema;
