const express = require("express");
const router = express.Router();
const shoppingCartController = require("../controllers/shoppingCart-controller");
const authenticateMiddleware = require("../middlewares/authenticate");

router.post(
  "/modify",
  authenticateMiddleware,
  shoppingCartController.modifyShoppingCart
);

router.get(
  "/get",
  authenticateMiddleware,
  shoppingCartController.getShoppingCart
);
router.delete(
  "/:deleteId",
  authenticateMiddleware,
  shoppingCartController.deleteShoppingCart
);

module.exports = router;
