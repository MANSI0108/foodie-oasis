const express = require("express");
const ErrorHandler = require("./src/middleware/asyncHandler");
const restaurantAuth = require("./src/routes/restaurant")
const menu_Route = require("./src/routes/menuRoute.js");
const verifyToken = require("./src/middleware/verifyToken.js");

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(verifyToken)

app.use('/foodApp', restaurantAuth)
app.use('/foodApp/menu', menu_Route)

app.use(ErrorHandler)

module.exports = app; 