const express = require("express");
const ErrorHandler = require("./src/middleware/asyncHandler");
const restaurantAuth = require("./src/routes/restaurant")
const menu_Route = require("./src/routes/menuRoute.js");
const verifyToken = require("./src/middleware/verifyToken.js");
const app = express();

const swaggerUi = require("swagger-ui-express")
const YAML = require("yaml")
const fs = require("fs-extra");
app.use(express.json())
//Swagger For Documentation

const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.urlencoded({ extended: true }))
app.use(verifyToken)

app.use('/foodApp', restaurantAuth)
app.use('/foodApp/menu', menu_Route)

app.use(ErrorHandler)

module.exports = app; 