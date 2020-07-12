const jwt = require("jsonwebtoken");
const config = require('config');

exports.generateToken = async (id) => {
    try {
        const payload = {
            user: {
                id
            }
        };
        return await jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000});    
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}