const express = require("express");
const app = express();
const authRoute = require('./src/routes/userRoute.js')
const ErrorHandler = require("./src/middleware/asyncHandler.js");
const swaggerUi = require("swagger-ui-express")
const YAML = require("yaml")
const fs = require("fs-extra");
app.use(express.json())
//Swagger For Documentation

const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.urlencoded({ extended: true }))

app.use('/foodApp', authRoute)
app.use(ErrorHandler)

module.exports = app; 
