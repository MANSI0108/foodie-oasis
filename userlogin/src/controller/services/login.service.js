const userDal = require("../../dal/user.dal.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const pool = require("../../config/db.js");


const loginUser = async (req, res, next) => {

    const { username, password } = req.body;

    const client = await pool.connect()
    try {
        
        const { rows, rowCount } = await userDal.findAdminByusername(username, '');
       
        if (rowCount === 0) {
            next(new Error("User does not exist"));
        }
        const user = rows[0];
        const checkPass = await bcrypt.compare(password, user.password);

        if (!checkPass) {
            next(new Error("Password is not correct"));
        }
        delete user.password;

        const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '10m' });
        return res.status(200).json({ message: "Login successfully", accessToken });

    } catch (error) {
        console.log(error);
        next(error)
    }
    finally{
        client.release()
    }
};

module.exports = loginUser;