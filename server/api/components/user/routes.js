const router = require('express').Router();
const {createUser} = require("./controller")
const {registerUserValidator} = require("./validator");

router
    .get("/", (req,res) => res.send('User Route'))
    .post("/",registerUserValidator, createUser);

module.exports = router;