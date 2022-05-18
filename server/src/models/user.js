const prisma = require("../utils/client");

// crear un usuario
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

// encontrar un usuario por el token
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

// encontrar un usuario por el mail
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
            token: loggedUser.token,
        }

       return userData;
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

// ordena todos los usuarios registrados por su score
const orderUsersByRank = async () => {
    try {
        const allUsers = await prisma.user.findMany();        
        let allUsersData = [];

      for (let i = 0; i < allUsers.length; i++) {
        allUsersData[i] = ( { user: allUsers[i].username, score: allUsers[i].score });
      }

      const rankedList = allUsersData.sort((a, b) => (b.score - a.score));
       return rankedList;
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

// ordena todos los usuarios registrados por su score
const getAllData = async () => {
    try {
        const allUsersData = await prisma.user.findMany();         
        return allUsersData;
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

// actualizar el score
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


module.exports = { create, findUserByToken, findUserByEmail, getAllData, orderUsersByRank, updateScore };