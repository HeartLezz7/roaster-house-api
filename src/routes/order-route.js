const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

const orderController = require("../controllers/order-controller");

router.get("/createItems", authenticate, orderController.createOrderItems);
router.post("/createOrder", authenticate, orderController.createOrder);

module.exports = router;
