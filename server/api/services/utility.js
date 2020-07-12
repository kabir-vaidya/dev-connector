const jwt = require("jsonwebtoken");
const config = require('config');

exports.generateToken = (id) => {
    const payload = {
        user: {
            id
        }
    };
    return await jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000});
}