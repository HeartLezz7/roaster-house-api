const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middlewares/upload");
const productController = require("../controllers/product-controller");

router.post(
  "/add",
  uploadMiddleware.single("productImage"),
  productController.addProduct
);

module.exports = router;
