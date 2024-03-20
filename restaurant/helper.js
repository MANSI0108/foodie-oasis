const pool = require("./src/config/db.config")

const isOwner = async (req, res, next) => {
  const role = req.user.role
  if (role != "owner") {
    const err = new Error("You Are Not a Owner")
    err.statusCode = 401
    next(err)
  }

  next()

}

const getRequestHandler = (fn) => async (request, response, next) => {

  const client = await pool.connect();
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


module.exports = { isOwner, getRequestHandler };