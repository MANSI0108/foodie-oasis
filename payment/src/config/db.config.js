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
<<<<<<< HEAD
  max: 5, 
=======
  max: 5,
>>>>>>> 4f06e5a8ef2cc634f4fc5d363428b906e79934a2
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,

})


<<<<<<< HEAD
console.log("Payment Database Connected");
=======
console.log("Database Connected");
>>>>>>> 4f06e5a8ef2cc634f4fc5d363428b906e79934a2


module.exports = pool