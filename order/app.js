const express = require("express");
const ErrorHandler = require("./src/middleware/asyncHandler");
const cartRoute = require('./src/routes/cartRoute');
const { client } = require("./helper");
const verifyToken = require("./src/middleware/verifyToken");
const orderRoute = require('./src/routes/orderRoute.js')

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//redis server
const connection = client.connect();

app.use(verifyToken)

app.use('/foodApp/cart', cartRoute)
app.use('/foodApp/order', orderRoute)

app.use(ErrorHandler)

module.exports = app;      