const router = require('express').Router();
const userController = require("./controller")
const {registerUserValidator} = require("./validator");
const verifyToken = require("../../middleware/auth");

router
    .get("/", verifyToken, userController.getUser)
    .post("/",registerUserValidator, userController.createUser);

module.exports = router;