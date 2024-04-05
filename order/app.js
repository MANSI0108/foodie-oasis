const express = require("express");
const ErrorHandler = require("./src/middleware/asyncHandler");
const Routes = require("./src/routes/index.js")
const { client } = require("./helper");
const verifyToken = require("./src/middleware/verifyToken");
const Job = require("./src/cronJob.scheduler.js");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//redis server
const connection = client.connect();

Job.start()  
app.use(verifyToken)

app.use("/foodApp", Routes )
 
app.use(ErrorHandler)

module.exports = app;      