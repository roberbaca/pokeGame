const user = require("../models/user");
const jwebtoken = require("../utils/jwt");

// para testeo:
const helloWorld = async (req, res) => {
    try {
        res.send("Hello World!");       

    } catch(error){
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

const registerUser = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const token = await jwebtoken.generateJWT({username, email});  // generamos el token
    console.log('token: ', token);

    try {
        const newUser = await user.create(username, email, password, token);
        res.send(newUser);
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

const loginUser = async (req, res) => {    
    const email = req.body.email;
    const password = req.body.password;

    try {
        const userData = await user.findUserByEmail(email);
        if (password === userData.password) {
            res.send("logged in: " + userData.username);
        }
        else {
            res.send("invalid password");
        }
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}


const getUserData = async (req, res) => {    
    if (req.query.token === "") {
        res.statusCode = 400;
        res.send("Token cannot be empty");
    }
    try {
        const userData = await user.findUserByToken(req.query.token);
        res.send(userData);
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

const updateScore = async (req, res) => {    
    const score = req.body.score;
    const token = req.body.token;

    try {

        const userData = await user.findUser(req.body.token);

        if (score > userData.score) {
            const updatedUserScore = await user.updateScore(token, score);       
            res.send(updatedUserScore);
        }
        else {
            res.send("No new record");
        }
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}



module.exports = { helloWorld, registerUser, loginUser, getUserData, updateScore };