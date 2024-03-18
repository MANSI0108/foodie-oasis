const express = require("express");
const ErrorHandler = require("./src/middleware/asyncHandler");
const upload = require("./src/middleware/multer");
const restaurantAuth = require("./src/routes/restaurant")

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/foodApp' ,upload.single("profile"), restaurantAuth)

app.use(ErrorHandler)

module.exports = app; 