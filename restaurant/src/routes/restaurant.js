const express = require("express");
const {registerRestaurant, allRestaurant, updateRestaurant, deleteRestaurant} = require("../controller/restaurant.controller");
const {handleRegisterData} = require("../middleware/validation ");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/multer");
const { isOwner } = require("../../helper");


const router = express.Router({ mergeParams: true })





router
    .route('/registerRestaurant')
    .post(verifyToken, upload.single("profile"), handleRegisterData, registerRestaurant);

router
     .route('/allRestaurant')
     .get(allRestaurant)

router
     .route('/updateRestaurant/:id')
     .patch(verifyToken, upload.single("profile"), isOwner , updateRestaurant)

router
    .route('/deleteRestaurant/:id')
    .delete(verifyToken, deleteRestaurant)


module.exports = router