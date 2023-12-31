const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middlewares/upload");
const productController = require("../controllers/product-controller");

router.post(
  "/add",
  uploadMiddleware.single("productImage"),
  productController.addProduct
);

router.get("/get", productController.getProducts);
router.get("/:productId", productController.findProduct);
router.patch(
  "/update/:productId",
  uploadMiddleware.single("productImage"),
  productController.updateProduct
);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
