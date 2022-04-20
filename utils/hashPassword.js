const bcrypt = require('bcrypt');

const hashPassword = async (password, salt=10)=>{
    const hash = await bcrypt.hash(password, salt);
    return hash
}


module.exports = {
    hashPassword,
};