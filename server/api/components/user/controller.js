const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @desc        Register User
// @route       POST         api/users
// @access      PUBLIC
exports.registerUser = async (req, res, next) => {
    //Check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }    
    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email});
        //See if user exists
        if(user){
            return res.status(400).json({
                success: false,
                errors: [{msg: 'User already exists'}]
            })
        }
        //Get Users gravatar
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
        jwt.sign( payload,
             config.get("jwtSecret"),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.status(200).json({ token });
            });

        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}