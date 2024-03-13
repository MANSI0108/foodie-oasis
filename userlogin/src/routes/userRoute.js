const express = require("express")
const router = express.Router({mergeParams:true})
const registerUser = require("../controller/services/register.service.js")
const { handleLoginData, handleRegisterData }  = require("../middleware/validationData.js") ;
const currentUser = require("../controller/services/currentUser.service.js");
const verifyToken = require("../middleware/validateToken.js");
const loginUser = require("../controller/services/login.service.js");


router
    .route('/register')
    .post(handleRegisterData, registerUser);

router
     .route('/login')
     .post(handleLoginData,loginUser)

router 
    .route('/currentuser' )
    .get(verifyToken, currentUser)

module.exports = router