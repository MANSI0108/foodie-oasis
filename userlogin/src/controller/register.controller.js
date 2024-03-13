const pool = require("../config/db.config.js");
const { registerService } = require("../services/user.service.js");

const registerUser = async (req, res, next) => {

  const client = await pool.connect();

  try {

    const { username, password, email, phone } = req.body
    const user = await registerService(username, password, email, phone)
    return res.status(201).send({ message: 'New User created', user: user.rows[0] });

  } catch (err) {
    next(err)
  } finally {
    client.release()

  }
};

module.exports = registerUser


