const express = require("express");
const { registerRestaurant, allRestaurant, updateRestaurant, deleteRestaurant, getRestaurantID } = require("../controller/restaurant.controller");
const { handleRegisterData } = require("../middleware/validation ");
const upload = require("../middleware/multer");
const { isOwner, getRequestHandler } = require("../../helper");


const router = express.Router({ mergeParams: true })





router
    .route('/registerRestaurant')
    .post(upload.single("profile"), handleRegisterData, getRequestHandler(registerRestaurant));

router
    .route('/allRestaurant')
    .get(getRequestHandler(allRestaurant))

router
    .route('/updateRestaurant/:id')
    .patch(upload.single("profile"), isOwner, getRequestHandler(updateRestaurant))

router
    .route('/deleteRestaurant/:id')
    .delete(getRequestHandler(deleteRestaurant))

    
//@private-route

router
    .route('/restaurant/:itemId')
    .get(getRequestHandler(getRestaurantID))


module.exports = router