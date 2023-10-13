const prisma = require("../models/prisma");
const fs = require("fs/promises");

exports.addProduct = async (req, res, next) => {
  try {
    const productObject = Object.assign({}, req.body, {
      productImage: req.file.filename,
    });
    const product = await prisma.product.create({ data: productObject });
    res.status(201).json({ message: "add complete", product });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};
