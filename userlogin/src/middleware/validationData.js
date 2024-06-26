
const handleRegisterData = async (req, res, next) => {
    const { username, password, email, phone, role } = req.body;

    if (!username || !password || !email || !phone || !role) {
        const err = new Error("Some fields are missing");
        err.statusCode = 400;
        next(err);
    }

    else {
        if (password.length < 8) {
            const err = new Error("Password must be at least 8 characters");
            err.statusCode = 400;
            next(err);
        }

        if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null) {
            const err = new Error("Email is not valid");
            err.statusCode = 400;
            next(err);
        }

        if ((phone.length) != 10) {
            const err = new Error("Phone number is invalid");
            err.statusCode = 400;
            next(err);
        }
        next();
    }


};


const handleLoginData = async (req, res, next) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {

        const err = new Error("Username or Password or role missing")
        err.statusCode = 400;
        next(err)

    }
    next()

}

module.exports = { handleLoginData, handleRegisterData }