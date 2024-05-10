const userDal = require("../dal/user.dal.js");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const registerService = async ({ client, username, password, email, phone, role }) => {

    const isExist = await userDal.findUserByEmail({ client, email });

    if (isExist.rowCount) {
        const err = new Error("User Already Exist")
        err.statusCode = 302;
        throw err

    }
    else {
        const hpassword = await bcrypt.hash(password, 10);
        const dal_result = await userDal.createUser({ client, username, hpassword, email, phone, role });
        return dal_result;
    }



}

const loginService = async ({ client, username, password, role }) => {
    const email = ""
    const { rows, rowCount } = await userDal.findAdminByusername({ client, username, email });

    if (rowCount === 0) {
        const err = new Error("User Not Found");
        err.statusCode = 404;
        throw err;

    }
    const user = rows[0];
    const checkPass = await bcrypt.compare(password, user.password);
    if (user.isveryfied) {
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

    else {
        const err = new Error("Please Verify Your Account")
        err.statusCode = 401;
        throw err
    }




}


module.exports = { registerService, loginService };
