const router = require('express').Router();
const userController = require("./controller")
const {createUserValidator} = require("./validator");
const verifyToken = require("../../middleware/auth");

router
    .get("/", verifyToken, userController.getUser)
    .post("/",createUserValidator, userController.createUser);

module.exports = router;