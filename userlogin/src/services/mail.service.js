const emailverifyTokenDal = require("../dal/emailtoken.dal.js");

const mailService = async ({client , token, user_id}) => {

    //store otp in email-verification -table
    const dal_result = await emailverifyTokenDal.createToken({client, token, user_id} );
    return dal_result;


}

module.exports = mailService