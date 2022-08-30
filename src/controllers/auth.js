const ctrl = {}
const model = require('../models/users')
const jwt = require('jsonwebtoken')
const bcr = require('bcrypt')
const respone = require('../helpers/respone')

const genToken = async(username, role) => {
    try {
        const payload = {
            user: username,
            role: role,
        }
        const token = jwt.sign(payload, process.env.JWTkey, { expiresIn: "60m" })

        const result = {
            msg: `Welcome ${role}`,
            token: token,
        };
        return result
    } catch (error) {
        throw error
    }
}

ctrl.Login = async(req, res) => {
    try {
        const { username, password } = req.body
        const passDB = await model.GetByUsers(username)
        let role = passDB[0].role
        if (passDB.length <= 0) {
            return respone(res, 401, 'Username Not Found!', true)
        }
        const pass = await bcr.compare(password, passDB[0].password)
        if (!pass) {
            return respone(res, 401, 'Password Incorrect', true)
        }
        const result = await genToken(username, role)
        console.log(result)

        return respone(res, 200, result)
    } catch (error) {
        return respone(res, 500, 'There is an error', true)
    }
}
module.exports = ctrl