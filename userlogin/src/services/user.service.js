const userDal = require("../dal/user.dal.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const registerService = async (username, password, email, phone, role) => {

    const pass = await bcrypt.hash(password, 10);
    const dal_result = await userDal.createUser(username, email, pass, phone, role);
    return dal_result;


}

const loginService = async (username, password, role) => {

    const { rows, rowCount } = await userDal.findAdminByusername(username, '');

    if (rowCount === 0) {
        const err = new Error("User Not Found");
        err.statusCode = 404;
        next(err);

    }
    const user = rows[0];
    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass) {
        const err = new Error("Password is not correct");
        err.statusCode = 203;
        throw err
    }
    delete user.password;

    if (role != user.role) {
        const err = new Error("Unauthorized User")
        err.statusCode = 401;
        throw err
    }

    const accessToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10m' });
    return accessToken;


}


module.exports = { registerService, loginService };
