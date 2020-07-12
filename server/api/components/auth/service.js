const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model');
const config = require('config');
const gravatar = require('gravatar');

exports.login = async (hash, password)=>{
    try {
        //Compare passwords
        return await bcrypt.compare(password, hash);
    } catch (err) {
        throw err;
    }
}