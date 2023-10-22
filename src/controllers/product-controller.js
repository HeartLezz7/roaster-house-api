const prisma = require("../models/prisma");
const fs = require("fs/promises");
const upload = require("../utils/cloudinary-service");

exports.addProduct = async (req, res, next) => {
  try {
    req.body.size = +req.body.size;
    req.body.amount = +req.body.amount;

    if (req.file) {
      const url = await upload(req.file.path);
      const productObject = Object.assign({}, req.body, {
        productImage: url,
      });
      const product = await prisma.product.create({ data: productObject });
      // UPDATE product
      // const product = await prisma.product.update({
      //   data: { productImage: url },
      //   where: { id: 4 },
      // });
      res.status(201).json({ message: "add complete", product });
    }
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({});
    res.status(200).json({ message: "get products", products });
  } catch (err) {
    next(err);
  }
};

exports.findProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await prisma.product.findFirst({
      where: { id: +productId },
    });
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};
