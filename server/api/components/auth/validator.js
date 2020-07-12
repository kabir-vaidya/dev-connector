const {check, validationResult} = require("express-validator");

exports.loginValidator = [
    check('email', "Please include a valid email").isEmail(),
    check('password', "Password is required").not().isEmpty()
]