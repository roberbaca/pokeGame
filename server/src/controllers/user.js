const user = require("../models/user");

const helloWorld = async (req, res) => {
    try {
        res.send("Hello World!");       

    } catch(error){
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

const createUser = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const newUser = await user.create(username, email, password);
        res.send(newUser);
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}



module.exports = { helloWorld, createUser };