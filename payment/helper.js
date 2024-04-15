const pool = require("./src/config/db.config")

<<<<<<< HEAD
=======
const isOwner = async (req, res, next) => {
  const role = req.user.role
  if (role != "owner") {
    const err = new Error("You Are Not a Owner")
    err.statusCode = 401
    next(err)
  }

  next()

}

>>>>>>> 4f06e5a8ef2cc634f4fc5d363428b906e79934a2
const getRequestHandler = (fn) => async (request, response, next) => {

  const client = await pool.connect();
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


<<<<<<< HEAD
module.exports = { getRequestHandler };
=======
module.exports = { isOwner, getRequestHandler };
>>>>>>> 4f06e5a8ef2cc634f4fc5d363428b906e79934a2
