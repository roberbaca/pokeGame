const express =require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/", userController.createUser);

router.get("/", userController.helloWorld);

router.get("/rank", () =>{
    console.log("Get All Users Ranking");
})

module.exports = router;