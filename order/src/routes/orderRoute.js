const express = require("express");
const { getRequestHandler } = require("../../helper");
const { orderDetails } = require("../controller/order.controller");
const router = express.Router({ mergeParams: true })

router
    .route('/placeOrder')
    .get(getRequestHandler(orderDetails));


module.exports = router; 