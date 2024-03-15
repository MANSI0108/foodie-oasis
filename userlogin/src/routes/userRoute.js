const express = require("express")
const router = express.Router({ mergeParams: true })
const { handleLoginData, handleRegisterData } = require("../middleware/validationData.js");
const verifyToken = require("../middleware/validateToken.js");
const registerUser = require("../controller/register.controller.js");
const loginUser = require("../controller/login.controller.js");
const currentUser = require("../controller/currentUser.controller.js");
const verifyEmail = require("../controller/verifyEmail.controller.js");




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
     .route('/verify-email')
     .post(verifyEmail)
    




module.exports = router