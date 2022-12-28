const express =require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/hello", userController.helloWorld); // para testeo

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/rank", userController.getAllRankedUsers);

router.get("/data", userController.getAllUsersData);

router.get("/userdata/:email", userController.getUserData);

router.patch("/update-score", userController.updateScore);

module.exports = router;