const bcryptjs = require('bcryptjs');

const encryptPassword = (password) => {
    const salt = bcryptjs.genSaltSync(); // generamos el codigo con una palabra random
    const hashedPassword = bcryptjs.hashSync(password, salt);
    return hashedPassword;
}

const comparePasswords = (password, encryptedPassword) => {
    const isValid = bcryptjs.compareSync(password, encryptedPassword);
    return isValid;
}

module.exports = { encryptPassword, comparePasswords };