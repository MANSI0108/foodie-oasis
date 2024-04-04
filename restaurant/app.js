const express = require("express");
const ErrorHandler = require("./src/middleware/asyncHandler");
const Routes = require("./src/routes/index.js")
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

app.use('/foodApp', Routes)


app.use(ErrorHandler)

module.exports = app; 