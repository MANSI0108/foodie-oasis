const express = require("express");
const ErrorHandler = require("./src/middleware/asyncHandler");
const Routes = require("./src/routes/index.js")
const { client } = require("./helper");
const verifyToken = require("./src/middleware/verifyToken");
const Job = require("./src/cronJob.scheduler.js");
const app = express();

const swaggerUi = require("swagger-ui-express")
const YAML = require("yaml")
const fs = require("fs-extra");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//SWagger For Documentation
const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file) 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//redis server
const connection = client.connect();

Job.start()
app.use(verifyToken)

app.use("/foodApp", Routes)
 
app.use(ErrorHandler)

module.exports = app;       