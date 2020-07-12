const authService = require('./service');
const {validationResult} = require("express-validator");
const userService = require("../user/service");
const utilityService = require("../../service/utility");

exports.login = (req,res,next) => {
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
        const {email, password} = req.body;
        let user = await userService.read(email);
        if(!user){
            return res.status(400).json({
                success: false,
                errors: [{msg: 'Invalid Credentials'}]
            })
        }
        //authService -> login handles signing in and returns token
        const isMatch = await authService.login(user.password, password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                msg: "Invalid Credentials"
            })
        }

        const token = await utilityService(user.id);
        res.status(200).json({ token });
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}