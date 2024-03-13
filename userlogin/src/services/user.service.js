const userDal = require("../dal/user.dal.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const registerService = async (username, password, email, phone) => {

    const pass = await bcrypt.hash(password, 10);
    const dal_result = await userDal.createUser(username, email, pass, phone);
    console.log(dal_result);
    return dal_result;

}

const loginService = async (username, password) => {

    const { rows, rowCount } = await userDal.findAdminByusername(username, '');

    if (rowCount === 0) {
        next(new Error("User does not exist"));
    }
    const user = rows[0];
    console.log(user);
    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass) {
        next(new Error("Password is not correct"));
    }
    delete user.password;

    const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '10m' });
    console.log(accessToken);
    return accessToken;


}


module.exports = { registerService, loginService };