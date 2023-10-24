const prisma = require("../models/prisma");
const fs = require("fs/promises");
const upload = require("../utils/cloudinary-service");

exports.addProduct = async (req, res, next) => {
  try {
    req.body.size = +req.body.size;

    if (req.file) {
      const url = await upload(req.file.path);
      const productObject = Object.assign({}, req.body, {
        productImage: url,
      });
      const product = await prisma.product.create({ data: productObject });
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

exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    await prisma.product.delete({
      where: {
        id: +productId,
      },
    });
    res.status(200).status({ message: "DELETED" });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    if (req.file) {
      const url = await upload(req.file.path);

      const { productId } = req.params;
      req.body.size = +req.body.size;
      req.body.productImage = url;
      const updatedProduct = await prisma.product.update({
        data: req.body,
        where: { id: +productId },
      });
      res.status(201).json({ message: "Updated", updatedProduct });
    }
  } catch (err) {
    next(err);
  }
};
