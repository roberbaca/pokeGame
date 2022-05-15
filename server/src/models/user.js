const prisma = require("../utils/client");
const jwebtoken = require("../utils/jwt");

const create = async (username, email, password) => {
    try {
        const newUser = await prisma.user.create({
            data: {               
                username: username,
                email: email,
                password: password,                
                score: 0
            },           
        })
        
        const token = await jwebtoken.generateJWT({username, email});  // generamos el token
        console.log('token: ', token);
        return newUser;
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}




module.exports = { create };