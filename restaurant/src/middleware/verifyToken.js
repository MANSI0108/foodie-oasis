
const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_SECRET;
const verifyToken = async (req, res, next) => {
    const bearerHeader = await req.headers["authorization"];
    if (!bearerHeader) {
        throw new Error("Access token is missing");
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
                // console.log(result);
                next();
            });
            // console.log(token);
            if (!token) {
                next(new Error("user is not authorized"));
            }
        } else {
            const err = new Error("Token Expired")
            next(err)

        }
    } catch (err) {
        next(err)

    }
};

module.exports = verifyToken;