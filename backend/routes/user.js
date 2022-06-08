const express = require('express');
const { registerUser, authUser } = require('../controllers/user');

const router=express.Router()

router.route("/").post(registerUser)

router.route("/login").post(authUser)

module.exports= router 