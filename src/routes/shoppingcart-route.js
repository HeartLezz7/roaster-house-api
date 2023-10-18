const express = require("express");
const router = express.Router();
const shoppingCartController = require("../controllers/shoppingCart-controller");

router.post("/create", shoppingCartController.createCart);
router.patch("/update", shoppingCartController.updateCart);

module.exports = router;
