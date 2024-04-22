require("dotenv").config();
const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_SECRET
const verifyToken = async (req, res, next) => {
    const bearerHeader = await req.headers["authorization"];
    if (!bearerHeader) {
        const err = new Error("Access token is missing")
        next(err)
      
    }

    try {
        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];

            jwt.verify(token, secretKey, (err, result) => {
                if (err) {
                    const err = new Error("Token is Invalid")
                    return next(err)
                }
                req.user = result
               return next();
            });
            if (!token) {
               return next(new Error("User is not authorized"));
            }

            return
        } 
    } catch (err) {
        next(err)

    }
};

module.exports = verifyToken;