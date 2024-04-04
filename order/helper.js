// Redis server connection
const { createClient } = require("redis");
const pool = require("./src/config/db.config");
const client = createClient().on('error', (err) => { throw err })

//Request Handler

const getRequestHandler = (fn) => async (request, response, next) => {
  const client = await pool.connect();
  request.client = client
  try {

    await fn(request, response, next);

  }
  catch (error) {
    next(error);
  }


}

module.exports = { client, getRequestHandler }  