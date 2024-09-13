const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

if (typeof userController.createUser !== "function") {
  console.error("userController.createUser não é uma função");
  userController.createUser = (req, res) => {
    res.status(501).json({ message: "Não implementado" });
  };
}

router.post("/create", userController.createUser);
router.put("/update-admin", authMiddleware, userController.updateAdminStatus);

module.exports = router;
