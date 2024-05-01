const mailService = require("../services/mail.service.js");
const { registerService } = require("../services/user.service.js");
const { generateOTP, generateMailTransporter } = require("../utils/mail.js");
const bcrypt = require("bcryptjs")

const registerUser = async (req, res, next) => {

  const client = req.client

  const { username, password, email, phone, role } = req.body
  const user = await registerService({ client, username, password, email, phone, role })

  // generate 6 digit otp
  let OTP = generateOTP();

  const token = await bcrypt.hash(OTP, 10);
  const user_id = user.rows[0].id;

  //store otp in email-verification -table
  mailService({ client, token, user_id });

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

};

module.exports = registerUser


