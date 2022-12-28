const users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

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
        
        if (!validPassword(password)){
            res.status(400).json({message: "Invalid password"});
            return;
        }            
        
        if (await userWithEmailExists(email)) {
            res.status(400).json({message: "Email already exists"});
            return;
        }        
        
        const hash = await bcrypt.hash(password, 10);
        const newUser = await users.create(username, email, hash);        
        res.send(newUser);
        return;

    } catch(error) {
        res.status(500).json({message: error.message});
        return;
    }   
}

// Logueo de usuarios
const loginUser = async (req, res) => {
    
    const email = req.body.email;        
    const password = req.body.password;    

    const user = await users.findUserByEmail(email); // buscamos el usuario por email  

    if (user){
        const result = await bcrypt.compare(password, user.password);
        if(result){
            const accessToken = jwt.sign(
            {    
                id: user.id,             
                username: user.username,
                email: user.email,
               

            }, `${process.env.ACCESS_TOKEN_SECRET_KEY}`);

            res.json({accessToken: accessToken});
            return;
        }
    }   
    res.status(403).json({ message: "Email or password not valid" });
}

// obtenemos TODOS los resultados de la base de datos
const getAllUsersData = async (req, res) => {    
    try {
        const allUsersData = await users.getAllData();
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
        const userRanks = await users.orderUsersByRank();
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
        const email = req.body.email;
        const updatedUserScore = await users.updateScore(email, score);       
        res.send(updatedUserScore);
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

const userWithEmailExists = async (email) => {
    try {
        const user = await users.findUserByEmail(email);
        return user !== null;
    } catch(error) {
        throw new Error("Error finding user");
    }
}

const validPassword = (password) => {
    return password;
}

const getUserData = async (req, res) => {
    try {
        const email = req.params.email;            
        const userdata = await users.findUserByEmail(email);
        res.send(userdata);
    } catch(error) {
        throw new Error("Error finding user");
    }
}



module.exports = { helloWorld, registerUser, loginUser, getAllUsersData, getAllRankedUsers, updateScore, getUserData };