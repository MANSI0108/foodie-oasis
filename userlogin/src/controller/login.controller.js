// Initilize express router
const { default: axios } = require("axios");
const { loginService } = require("../services/user.service.js");


const loginUser = async (req, res, next) => {
    const client = req.client
    const { username, password, role } = req.body;
    const accessToken = await loginService({client, username, password, role});
    return res.status(200).json({ message: "Login successfully", accessToken });

};



// Description: Handles all the user related logic
async function getGitAuthURL(req,res,next) {
	const rootUrl = 'https://github.com/login/oauth/authorize';
	const options = {
		redirect_uri: process.env.REDIRECT_URI,
		client_id: process.env.CLIENT_ID,
		response_type: 'code',
        scope: 'user:email',
		path: '/'

	};
	const url =  `${rootUrl}?client_id=${options.client_id}&redirect_uri=${options.redirect_uri}?path=${options.path}&scope=user:email&response_type=${options.response_type}`;
    res.redirect(url);
}



// Description: Get Tokens

async function getTokens({ code, client_id, client_secret }) {

	const url = 'https://github.com/login/oauth/access_token';
	const values = {
		code,
		client_id,
		client_secret,
	};
    
	return axios.post(url, values, { headers: { "Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json"},  }).then(res => res.data).catch(error => { throw new Error(error.message) });
}


module.exports = {loginUser, getGitAuthURL, getTokens };   



