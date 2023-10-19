const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const { addressValidateSchema } = require("../validators/address-validator");
const validator = require("../validators/validate-shcema");

exports.createAddress = async (req, res, next) => {
  try {
    const value = validator(addressValidateSchema, req.body, 400);
    value.userId = req.user.id;
    const address = await prisma.address.create({ data: value });
    res.status(201).json({ message: "Create address SUCCESS", address });
  } catch (err) {
    next(err);
  }
};

exports.getAddress = async (req, res, next) => {
  try {
    if (!req.user) {
      return createError("user not found", 400);
    }
    const address = await prisma.address.findFirst({
      where: { userId: req.user.id },
    });
    res
      .status(200)
      .json({ message: "Get address", address, userId: req.user.id });
  } catch (err) {
    next(err);
  }
};
