const {
  Pool
} = require("pg");

require("dotenv").config();


const pool = new Pool({

  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 5, 
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,

})


console.log("Payment Database Connected");


module.exports = pool