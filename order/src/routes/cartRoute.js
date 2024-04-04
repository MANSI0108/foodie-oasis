const express = require("express");
const { addtocart, getCart, deletecart } = require("../controller/cart.controller");
const { getRequestHandler } = require("../../helper");
const router = express.Router({ mergeParams: true })

router
    .route('/addtocart/:id')
    .post(getRequestHandler(addtocart));

router
    .route('/')
    .get(getRequestHandler(getCart));

router
    .route('/delete')
    .delete(getRequestHandler(deletecart))



module.exports = router;