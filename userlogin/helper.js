const pool = require("./src/config/db.config");

const getRequestHandler = (fn) => async (request, response, next) => {

  const client = await pool.connect()
  request.client = client

  try {

    await fn(request, response, next);

  }
  catch (error) {
    next(error);
  }
  
  finally {
    client.release()
  }

}

module.exports = { getRequestHandler }