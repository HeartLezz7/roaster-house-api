const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");
const { registerSchema, loginSchema } = require("../validators/auth-validator");

const validator = require("../validators/validate-shcema");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    const value = validator(registerSchema, req.body, 400);
    value.password = await bcrypt.hash(value.password, 12);
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
      return next(createError("user not found", 400));
    }
    const isPassword = bcrypt.compare(value.password, user.password);
    if (!isPassword) {
      return next(createError("user not found", 400));
    }

    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "1q2w3e4r5t6y7u8i9o0p",
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    delete user.password;

    res.json({ message: "login SUCCESS", user, accessToken });
  } catch (err) {
    next(err);
  }
};

exports.adminRegister = async (req, res, next) => {
  try {
    const value = validator(registerSchema, req.body, 400);
    value.role = "admin";
    value.password = await bcrypt.hash(value.password, 12);
    const registerAdmin = await prisma.user.create({ data: value });
    res.json({ message: "Admin register SUCCESS", registerAdmin });
  } catch (err) {
    next(err);
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const value = validator(loginSchema, req.body, 400);
    const admin = await prisma.user.findFirst({
      where: {
        AND: [
          { OR: [{ email: value.email }, { username: value.username }] },
          { role: "admin" },
        ],
      },
    });
    if (!admin) {
      return next(createError("Admin not found", 400));
    }
    const isPassword = bcrypt.compare(value.password, admin.password);
    if (!isPassword) {
      return next(createError("Invalid", 400));
    }

    const payload = { userId: admin.id, role: admin.role };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "1q2w3e4r5t6y7u8i9o0p",
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    delete admin.password;

    res.json({ message: "login SUCCESS", admin, payload, accessToken });
  } catch (err) {
    next(err);
  }
};
