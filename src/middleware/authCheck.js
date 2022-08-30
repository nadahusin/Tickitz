const jwt = require("jsonwebtoken");
const respone = require("../helpers/respone");

const authValidate = (role) => {
    return (req, res, next) => {
        const { authtoken } = req.headers
        if (!authtoken) {
            return respone(res, 401, "Please Log In")
        }
        jwt.verify(authtoken, process.env.JWT_KEYS, (error, decode) => {
            if (error) {
                return respone(res, 401, error, true)
            } else if (role.includes(decode.role)) {
                req.decode = decode
                next()
            } else {
                return respone(res, 401, "You don't have a accsess")
            }
        });
    }
}


module.exports = authValidate