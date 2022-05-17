const express =require("express");
const userController = require("../controllers/user");

const router = express.Router();

//router.get("/", userController.helloWorld); // para testeo

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/", userController.getUserData);

router.patch("/", userController.updateScore);

router.get("/rank", () =>{
    console.log("Get All Users Ranking");
})

module.exports = router;