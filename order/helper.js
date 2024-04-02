// Redis server connection

const { createClient } = require("redis");
const client = createClient().on('error', (err) => { throw err })

const getRequestHandler = (fn) => async (request, response, next) => {

  try {

    await fn(request, response, next);

  }
  catch (error) {
    next(error);
  }


}

module.exports = { client, getRequestHandler }  