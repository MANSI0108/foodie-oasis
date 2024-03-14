const pool = require("../config/db.config.js");
const { loginService } = require("../services/user.service.js");


const loginUser = async (req, res, next) => {

    const { username, password } = req.body;
    const client = await pool.connect()
    try {

        const accessToken = await loginService(username, password);
        return res.status(200).json({ message: "Login successfully", accessToken });

    } catch (error) {
        next(error)
    }
    finally {
        client.release()
    }
};

module.exports = loginUser;