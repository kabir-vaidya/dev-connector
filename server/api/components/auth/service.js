const bcrypt = require('bcryptjs');

exports.login = async (hash, password)=>{
    try {
        //Compare passwords
        return await bcrypt.compare(password, hash);
    } catch (err) {
        throw err;
    }
}