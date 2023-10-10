const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma");
const { registerSchema } = require("../validators/auth-validator");

const validator = require("../validators/validateShcema");

exports.register = async (req, res, next) => {
  try {
    const value = validator(registerSchema, req.body, 400);
    console.log(value);
    value.password = await bcrypt.hash(value.password, 12);
    console.log(value.password);
    const registerUser = await prisma.user.create({ data: value });
    res.json({ message: "register SUCCESS", registerUser });
  } catch (err) {
    next(err);
  }
};
