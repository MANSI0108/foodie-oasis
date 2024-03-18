const express = require("express");
const registerRestaurant = require("../controller/restaurant.controller");
const handleRegisterData = require("../middleware/validation ");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router({ mergeParams: true })





router
    .route('/registerRestaurant')
    .post(verifyToken, handleRegisterData, registerRestaurant);




module.exports = router