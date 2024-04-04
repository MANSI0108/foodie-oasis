
const { loginService } = require("../services/user.service.js");


const loginUser = async (req, res, next) => {
    const client = req.client
    const { username, password, role } = req.body;
    const accessToken = await loginService({client, username, password, role});
    return res.status(200).json({ message: "Login successfully", accessToken });

};

module.exports = loginUser;