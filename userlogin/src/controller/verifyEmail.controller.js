const userDal = require("../dal/user.dal.js");
const emailverifyTokenDal = require("../dal/emailtoken.dal.js");
const bcrypt = require("bcrypt");
const { generateMailTransporter } = require("../utils/mail.js");
const jwt = require("jsonwebtoken");

const verifyEmail = async (req, res, next) => {

  const client = req.client
  const { email, OTP } = req.body;

  const user = await userDal.findUserByEmail({client, email})
  const user_id = user.rows[0].id
  if (!user.rows[0]) {
    return next(new Error("User Not Found"))
  };

  if (user.rows[0].isveryfied) return next(new Error("User is already verified"))

  const token = await emailverifyTokenDal.findToken({client, user_id})

  if (!token.rows[0]) return next(new Error("Token Not Found"))
  if (token.rows[0]) { }
  const ismatched = await bcrypt.compare(OTP, token.rows[0].token);
  if (!ismatched) return next(new Error("Your OTP is Not Valid!"))

  const updateStatus = await userDal.changeVerifiedStatus({client,user_id})

  if (updateStatus) {

    await emailverifyTokenDal.deleteToken({client, user_id});

  }

  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.rows[0].email,
    subject: "Welcome Email",
    html: "<h1>Welcome to our app and thanks for choosing us.</h1>",
  });

  const jwtToken = jwt.sign({ user_id: user.rows[0].id }, process.env.JWT_SECRET);

  const newuser = await userDal.findUserByEmail({client, email})

  res.json({
    user: { 
      id: newuser.rows[0].id,
      name: newuser.rows[0].username,
      email: newuser.rows[0].email,
      token: jwtToken,
      isVerified: newuser.rows[0].isveryfied,
      role: newuser.rows[0].role,
    },
    message: "Your email is verified.",
  });

}
module.exports = verifyEmail