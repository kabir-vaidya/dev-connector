const router = require('express').Router();
const {registerUser} = require("../../controllers/users")
const {registerUserValidator} = require("../validation/users");

router
    .get("/", (req,res) => res.send('User Route'))
    .post("/",registerUserValidator, registerUser);

module.exports = router;