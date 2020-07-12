const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./model');
const config = require('config');
const gravatar = require('gravatar');
const utilityService = require('../../services/utility');

exports.read = async (email)=>{
    try {
        let user = await User.findOne({email}) || null;
        return user;
    } catch (err) {
        throw err;
    }
}

exports.getUser = async (id) => {
    try {
        const user = await User.findById(id).select("-password");
        return user;
    } catch (err) {
        console.log(err.message);
    }
}

exports.createUser = async ({name, email, password})=>{
        try {
            const avatar = gravatar.url(email, {
                s: "200",
                r: 'x',
                d: "mm"
            })
            user = new User({
                name, 
                email,
                avatar,
                password
            });
            //Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            //Return jsonwebtoken
            const token = await utilityService.generateToken(user.id);
            return token;
        } catch (err) {
            throw err;
        }
}