const express = require("express");
const { getRequestHandler } = require("../../helper");
const { orderDetails, addPaymentID } = require("../controller/order.controller");
const router = express.Router({ mergeParams: true })

router
    .route('/')
    .get(getRequestHandler(orderDetails));

router
   .route('/update')
   .patch(getRequestHandler(addPaymentID))    

module.exports = router;  