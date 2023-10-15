const express = require("express");
const authController = require("../controllers/auth-controllers");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/admin/register", authController.adminRegister);
router.post("/admin/login", authController.adminLogin);

module.exports = router;
