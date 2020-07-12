const router = require('express').Router();
const authController = require('./controller');
const loginValidation = require('./validator');

// @desc        Login User
// @route       POST         /api/auth/login
// @access      PUBLIC
router.post("/login", loginValidation, authController.login);


module.exports = router;