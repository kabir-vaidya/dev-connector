const { check, validationResult } = require('express-validator');
const userService = require('./service');


// @desc        Register User
// @route       POST         api/users
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

    const {name, email, password} = req.body;

    try {

        //userService -> read checks database if user already exists
        let user = await userService.read(email);
        if(user){
            return res.status(400).json({
                success: false,
                errors: [{msg: 'User already exists'}]
            })
        }
        
        //userService -> createUser handles creation of user and 
        //               generating jwt
        const token = await userService.createUser({name, email, password});
        res.status(200).json({ token });
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}