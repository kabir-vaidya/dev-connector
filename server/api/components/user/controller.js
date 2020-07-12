const { check, validationResult } = require('express-validator');
const userService = require('./service');


// @desc        Get User from token
// @route       GET         /api/users
// @access      PUBLIC
exports.getUser = async (req, res, next) => {
    try {
        const user = await userService.getUser(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({msg: "Server error"});
    }
}


// @desc        Register User
// @route       POST         /api/users
// @access      PUBLIC
exports.createUser = async (req, res, next) => {
    //Check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        })
    }    
    try {
        //userService -> read checks database if user already exists
        let user = await userService.read(req.body.email);
        if(user){
            return res.status(400).json({
                success: false,
                errors: [{msg: 'User already exists'}]
            })
        }
        //userService -> createUser handles creation of user and generating jwt
        const token = await userService.createUser(req.body);
        res.status(200).json({ token });
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}

