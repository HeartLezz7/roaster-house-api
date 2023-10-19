const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

const orderController = require("../controllers/order-controller");

router.get("/get", authenticate, orderController.getOrderItem);

module.exports = router;
