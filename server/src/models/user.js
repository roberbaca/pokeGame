const prisma = require("../utils/client");

const create = async (username, email, password, token) => {
    try {
        const newUser = await prisma.user.create({
            data: {               
                username: username,
                email: email,
                password: password,   
                token: token,             
                score: 0
            },           
        })        
      
        return (newUser);
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

const findUserByToken = async (token) => {
    try {
        const user = await prisma.user.findUnique({           
              where: {
                token: token,
              },
        })           
       
        const userData = {
            username: user.username,
            score: user.score,
        }

       return userData;
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

const findUserByEmail = async (email) => {
    try {
        const loggedUser = await prisma.user.findUnique({           
              where: {
                email: email,
              },
        })           
       
        const userData = {
            username: loggedUser.username,
            score: loggedUser.score,
            password: loggedUser.password,
        }

       return userData;
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

const updateScore = async (token, score) => {
    try {
        const updateUser = await prisma.user.update({           
              where: {
                token: token,
              },
              data: {
                score: score,
              },
        })           
       
        const userData = {
            username: updateUser.username,
            score: updateUser.score,
        }

       return userData;
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}


module.exports = { create, findUserByToken, findUserByEmail, updateScore };