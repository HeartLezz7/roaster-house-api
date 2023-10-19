const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

const addressController = require("../controllers/address-controller");

router.post("/create", authenticate, addressController.createAddress);
router.get("/get", authenticate, addressController.getAddress);

module.exports = router;
