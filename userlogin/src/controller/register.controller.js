const pool = require("../config/db.config.js");
const mailService = require("../services/mail.service.js");
const { registerService } = require("../services/user.service.js");
const { generateOTP, generateMailTransporter } = require("../utils/mail.js");
const bcrypt = require("bcrypt")
const registerUser = async (req, res, next) => {

  const client = await pool.connect();

  try {

    const { username, password, email, phone, role } = req.body
    const user = await registerService(username, password, email, phone, role)

    // generate 6 digit otp
    let OTP = generateOTP();

    const token = await bcrypt.hash(OTP, 10);

    //store otp in email-verification -table
    const dal_result = mailService(token, user.rows[0].id);

    // send that otp to our user

    var transport = generateMailTransporter();

    transport.sendMail({
      from: "verification@foodieOasis.com",
      to: user.rows[0].email,
      subject: "Email Verification",
      html: `
      <p>Your verification OTP</p>
      <h1>${OTP}</h1>
    `,
    });
    return res.status(201).send({ message: 'New User created', Verification: " Please verify your account by email. OTP has been sent your email account", user: user.rows[0] });

  } catch (err) {
    next(err)
  } finally {
    client.release()

  }
};

module.exports = registerUser


