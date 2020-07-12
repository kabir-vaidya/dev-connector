const {check, validationResult} = require("express-validator");

exports.registerUserValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', "Please include a valid email").isEmail(),
    check('password', "Password must be 8-30 characters long")
        .isLength({
            min: 8,
            max: 30
        })
]