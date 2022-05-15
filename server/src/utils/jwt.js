const jwt = require('jsonwebtoken');

const generateJWT = ( {username, email} ) => {
    return new Promise ((resolve, reject) => {
        const payload = { username, email };
        jwt.sign(payload, 'catch-em-all', {}, (err, token) => {
            if(err){
                reject(err);
            }
            if(token){
                resolve(token);
            }
        });
    })
}

module.exports = { generateJWT };