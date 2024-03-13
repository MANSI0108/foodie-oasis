const express = require("express");
const app = express();
const authRoute = require('./src/routes/userRoute.js')

const errorHandler = require("./src/middleware/asyncHandler.js");


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use ('/foodApp',authRoute)

app.use(errorHandler)

module.exports = app; 
