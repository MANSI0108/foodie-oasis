// app.js
const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./src/routes/paymentRoute');
const ErrorHandler = require('./src/middleware/asyncHandler');
const app = express();

const swaggerUi = require("swagger-ui-express")
const YAML = require("yaml")
const fs = require("fs-extra");
app.use(express.json())
//Swagger For Documentation

const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');



app.use('/payment', paymentRoutes);

app.use(ErrorHandler)

module.exports = app;  