const router = require('express').Router();
const authController = require('./controller');
const {loginValidator} = require('./validator');


router.post("/login", loginValidator, authController.login);


module.exports = router;