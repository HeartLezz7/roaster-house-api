const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  username: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .strip(),
  email: Joi.string()
    .pattern(/@(gmail|hotmail)\.com$/)
    .trim()
    .required(),
  phone: Joi.string().trim().required(),
});

const loginSchema = Joi.object({
  emailOrUsername: Joi.alternatives([
    Joi.string()
      .pattern(/@(gmail|hotmail)\.com$/)
      .email({ tlds: { allow: ["com"] } }),
    Joi.string()
      .trim()
      .pattern(/^[a-zA-Z0-9]{6,30}$/),
  ])
    .required()
    .strip(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
  username: Joi.forbidden().when("emailOrUsername", {
    is: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z0-9]{6,30}$/),
    then: Joi.string().trim().default(Joi.ref("emailOrUsername")),
  }),
  email: Joi.forbidden().when("emailOrUsername", {
    is: Joi.string()
      .pattern(/@(gmail|hotmail)\.com$/)
      .email({ tlds: { allow: ["com"] } }),
    then: Joi.string().default(Joi.ref("emailOrUsername")),
  }),
});

const updateProfileSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  // .messages({ "string.empty": "first name is required" })
  lastName: Joi.string().trim().required(),
  email: Joi.string()
    .pattern(/@(gmail|hotmail)\.com$/)
    .trim()
    .required(),
  phone: Joi.string().trim().required(),
});

const adminLoginSchema = Joi.object({
  emailOrUsername: Joi.alternatives([
    Joi.string()
      .pattern(/@(gmail|hotmail)\.com$/)
      .email({ tlds: { allow: ["com"] } }),
    Joi.string()
      .trim()
      .pattern(/^[a-zA-Z0-9]{6,30}$/),
  ])
    .required()
    .strip(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
  username: Joi.forbidden().when("emailOrUsername", {
    is: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z0-9]{6,30}$/),
    then: Joi.string().trim().default(Joi.ref("emailOrUsername")),
  }),
  email: Joi.forbidden().when("emailOrUsername", {
    is: Joi.string()
      .pattern(/@(gmail|hotmail)\.com$/)
      .email({ tlds: { allow: ["com"] } }),
    then: Joi.string().default(Joi.ref("emailOrUsername")),
  }),
  role: Joi.string().trim().required(),
});

const adminRegisterSchema = Joi.object({
  emailOrUsername: Joi.alternatives([
    Joi.string()
      .pattern(/@(gmail|hotmail)\.com$/)
      .email({ tlds: { allow: ["com"] } }),
    Joi.string()
      .trim()
      .pattern(/^[a-zA-Z0-9]{6,30}$/),
  ])
    .required()
    .strip(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
  username: Joi.forbidden().when("emailOrUsername", {
    is: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z0-9]{6,30}$/),
    then: Joi.string().trim().default(Joi.ref("emailOrUsername")),
  }),
  email: Joi.forbidden().when("emailOrUsername", {
    is: Joi.string()
      .pattern(/@(gmail|hotmail)\.com$/)
      .email({ tlds: { allow: ["com"] } }),
    then: Joi.string().default(Joi.ref("emailOrUsername")),
  }),
  role: Joi.string().trim().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  adminLoginSchema,
  adminRegisterSchema,
};
