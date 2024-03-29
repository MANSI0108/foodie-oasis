const express = require("express");
const { addtocart, getCart } = require("../controller/cart.controller");
const { getRequestHandler } = require("../../helper");
const router = express.Router({ mergeParams: true })





router
    .route('/addtocart/:id')
    .post(getRequestHandler(addtocart));

router
    .route('/getcart')
    .get(getRequestHandler(getCart));










module.exports = router;