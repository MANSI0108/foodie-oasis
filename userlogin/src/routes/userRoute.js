const express = require("express")
const router = express.Router({ mergeParams: true })
const { handleLoginData, handleRegisterData } = require("../middleware/validationData.js");
const verifyToken = require("../middleware/validateToken.js");
const registerUser = require("../controller/register.controller.js");
const loginUser = require("../controller/login.controller.js");
const currentUser = require("../controller/currentUser.controller.js");
const loginOwner = require("../controller/loginOwner.js");



router
    .route('/register')
    .post(handleRegisterData, registerUser);

router
    .route('/login-User')
    .post(handleLoginData, loginUser)

router
    .route('/currentuser')
    .get(verifyToken, currentUser)

router
    .route('/login-admin')
    .get(handleLoginData, loginOwner)

module.exports = router