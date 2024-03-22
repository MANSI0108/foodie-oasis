const express = require("express");
const ErrorHandler = require("./src/middleware/asyncHandler");
const {createClient} = require("redis")
const cartRoute = require('./src/routes/cartRoute')

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//redis server
const redisConnection = async () => {
    const client = createClient();
    await client.connect();
    client.on('error', err => console.log('Redis Client Error', err));
}

redisConnection()

app.use('/foodApp/cart', cartRoute)

app.use(ErrorHandler)

module.exports = app; 