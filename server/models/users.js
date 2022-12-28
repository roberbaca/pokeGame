const prisma = require("../utils/client");

// crear un usuario
const create = async (username, email, password ) => {
    try {
        const newUser = await prisma.user.create({
            data: {               
                username: username,
                email: email,
                password: password,                
                score: 0
            },           
        })        
      
        return (newUser);
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}


// encontrar un usuario por el mail
const findUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return user;

    } catch (error) {
        throw new Error("Error finding user");
    }
}

// encontrar un usuario por el mail
const findUserById = async (id) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id   
            }
        });
        return user;

    } catch (error) {
        throw new Error("Error finding user");
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
const updateScore = async (email, score) => {
    try {
        const updateUser = await prisma.user.update({           
            where: {
                email: email,
            },
            data: {
                score: score,
            },
        })           
       
        return updateUser;
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

// para eliminar un usuario
const deleteUserById = async (id) => {
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: id                 
            }
        })
        return deletedUser;
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
  }


module.exports = { create, findUserByEmail, getAllData, orderUsersByRank, updateScore, deleteUserById, findUserById };