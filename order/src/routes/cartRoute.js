const express = require("express");
const { addtocart } = require("../controller/cart.controller");
const router = express.Router({mergeParams : true})





router
    .route('/addtocart/:id')
    .post(addtocart);












module.exports =router;