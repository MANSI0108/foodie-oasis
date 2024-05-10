const express = require("express")
const router = express.Router({ mergeParams: true })
const { handleLoginData, handleRegisterData } = require("../middleware/validationData.js");
const verifyToken = require("../middleware/validateToken.js");
const registerUser = require("../controller/register.controller.js");
const loginUser = require("../controller/login.controller.js");
const currentUser = require("../controller/currentUser.controller.js");
const verifyEmail = require("../controller/verifyEmail.controller.js");
const { getRequestHandler } = require("../../helper.js");
const { default: axios } = require("axios");
const jwt = require('jsonwebtoken');



router
    .route('/register')
    .post(handleRegisterData, getRequestHandler(registerUser));

router
    .route('/user/login')
    .get(loginUser.getGitAuthURL)

router
    .route('/login')
    .post(handleLoginData, getRequestHandler(loginUser))

router
    .route('/currentuser')
    .get(getRequestHandler(currentUser.currentUser))

router
    .route('/user')
    .get(verifyToken, getRequestHandler(currentUser.user))
router
    .route('/verify-email')
    .post(getRequestHandler(verifyEmail))





// Auth Callback 
router.get('/auth/callback', async (req, res) => {

    const code = req.query.code;

    const data = await loginUser.getTokens({
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
    });

    // Fetch User Profile with Access Token and bearer token
    const { access_token } = data;

    const gitUser = await axios.get(`https://api.github.com/user`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }

    }).then((res) => {

        return res.data
    })
        .catch(error => {
            throw new Error(error.message)

        });



    const token = jwt.sign({ gitUser }, process.env.JWT_SECRET);

    res.cookie('gitUser', token, { httpOnly: true });
    res.redirect('/foodApp/currentuser');
});


module.exports = router