const express = require("express");
const { registerRestaurant, allRestaurant, updateRestaurant, deleteRestaurant, getRestaurantID } = require("../controller/restaurant.controller");
const { handleRegisterData } = require("../middleware/validation ");
const upload = require("../middleware/multer");
const { isOwner, getRequestHandler } = require("../../helper");


const router = express.Router({ mergeParams: true })





router
    .route('/register')
    .post(upload.single("profile"), handleRegisterData, getRequestHandler(registerRestaurant));

router
    .route('/')
    .get(getRequestHandler(allRestaurant))

router
    .route('/update/:id')
    .patch(upload.single("profile"), isOwner, getRequestHandler(updateRestaurant))

router
    .route('/delete/:id')
    .delete(getRequestHandler(deleteRestaurant))

    
//@private-route

router
    .route('/:itemId')
    .get(getRequestHandler(getRestaurantID))


module.exports = router