const pool = require("../../config/db.js");
const userDal = require("../../dal/user.dal.js");
const bcrypt = require("bcrypt")

const registerUser = async (req, res, next) => {

  const client = await pool.connect()
  
  try {
    const username = req.body.username;
    const pass = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone


    //hashpassword
    const password = await bcrypt.hash(pass, 10);

   
    const dal_result = await userDal.createUser(username, email, password, phone);
    res.status(201).send({ message: 'New User created', userId: dal_result.rows[0] });

  }
  catch (err) {
    next(err)
  }
  finally {
    client.release()
   
  }
};  


module.exports = registerUser


