const  pool = require("../config/db.js");



const createUserTable = async () => {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS userdata (
          id SERIAL PRIMARY KEY,
          username  VARCHAR(255),
          email  VARCHAR(255),
          password  VARCHAR(255),
          phone bigint 

        );
      `;
  
      await pool.query(query);
      console.log('User Created');
    } catch (err) {
      console.error(err);
      console.error('User table creation failed');
    }
  }

module.exports = {createUserTable}