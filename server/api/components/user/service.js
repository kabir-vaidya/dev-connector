const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./model');
const config = require('config');
const gravatar = require('gravatar');

exports.read = async (email)=>{
    try {
        let user = await User.findOne({email}) || null;
        return user;
    } catch (err) {
        throw err;
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
            const payload = {
                user: {
                    id: user.id // same as user._id
                }
            }
            let token = jwt.sign( payload,
                 config.get("jwtSecret"),
                { expiresIn: 360000 });
            return token;
        } catch (err) {
            throw err;
        }
}