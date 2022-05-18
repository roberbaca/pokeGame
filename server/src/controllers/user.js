const user = require("../models/user");
const jwebtoken = require("../utils/jwt"); // generacion de token
const { encryptPassword, comparePasswords } = require('../utils/bcrypt'); //Encriptacion de Contraseñas

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

// Registro de usuarios nuevos
const registerUser = async (req, res) => {
    try {        
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword = encryptPassword(password);               // encriptamos la contraseña
        const token = await jwebtoken.generateJWT({username, email});   // generamos el token
        console.log('token: ', token);
        const newUser = await user.create( username, email, hashedPassword, token );
        res.send(newUser);
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

// Logueo de usuarios
const loginUser = async (req, res) => {        
    try {
        const email = req.body.email;
        const password = req.body.password;    
        const userData = await user.findUserByEmail(email);
        const isValid = comparePasswords(password, userData.password); // comparamos contraseñas encriptadas

        if (isValid) {        
            res.status(202).send("logged in: " + userData.username + " token: " + userData.token );
        } else {
            res.status(404).send({ token: null, problem: { message: 'Invalid email or password'} });
        }
          
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

// obtenemos TODOS los resultados de la base de datos
const getAllUsersData = async (req, res) => {    
    try {
        const allUsersData = await user.getAllData();
        res.send(allUsersData);
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

// obtenemos los 10 primeros usuarios ordenados de acuerdo a su ranking
const getAllRankedUsers = async (req, res) => {    
    try {
        const userRanks = await user.orderUsersByRank();
        res.send(userRanks);
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}


// Actualizamos score de un usuario
const updateScore = async (req, res) => {    
    
    try {
        const score = req.body.score;
        const token = req.body.token;
        const userData = await user.findUserByToken(req.body.token);

        if (score > userData.score) {
            const updatedUserScore = await user.updateScore(token, score);       
            res.send(updatedUserScore);
        } else {
            res.send("No new record");
        }
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}


module.exports = { helloWorld, registerUser, loginUser, getAllUsersData, getAllRankedUsers, updateScore };