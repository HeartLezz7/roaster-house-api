const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");
const { registerSchema, loginSchema } = require("../validators/auth-validator");

const validator = require("../validators/validateShcema");
const { object } = require("joi");

exports.register = async (req, res, next) => {
  try {
    const value = validator(registerSchema, req.body, 400);
    const isGmail = value.email.includes("gmail");
    const isHotmail = value.email.includes("hotmail");

    if (!isGmail && !isHotmail) {
      return res.status(404).json({ message: "invalid email" });
    }

    value.password = await bcrypt.hash(value.password, 12);
    console.log(value.password);
    const registerUser = await prisma.user.create({ data: value });
    res.json({ message: "register SUCCESS", registerUser });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validator(loginSchema, req.body, 400);
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: value.email }, { username: value.username }],
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPassword = bcrypt.compare(value.password, user.password);
    if (!isPassword) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "1q2w3e4r5t6y7u8i9o0p",
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    const userData = Object.assign({
      firstName: user.firstName,
      lastName: user.lastName,
    });

    res.json({ message: "login SUCCESS", userData, accessToken });
  } catch (err) {
    next(err);
  }
};
