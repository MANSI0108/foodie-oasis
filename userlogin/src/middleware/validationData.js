
const userDal = require("../dal/user.dal.js")


const handleRegisterData = async (req, res, next) => {
    const { username, password, email, phone } = req.body;

    if (!username || !password || !email || !phone) {
        next ( new Error("Some fields are missing"));
    }

    if (password.length < 8) {
        next(new Error("Password must be at least 8 characters"))
    }

    if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null) {
        next (new Error("Email is not valid"));
    }

    if ((phone.length) != 10) {
        next(new Error("Phone number is invalid")) ;
    }

    try {
        const result = await userDal.findAdminByusername(username, email);

        if (result.rows.length > 0) {
            next (new Error("User is already exist"));
        }

        next();
    } catch (err) {
        next(err)
    }
};


const handleLoginData = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        const err = new Error("Username or Password missing")
         next(err)

    }
   next()

}

module.exports = {handleLoginData,handleRegisterData}