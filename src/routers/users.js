const express = require('express')
const Router = express.Router()
const ctrl = require('../controllers/users')
const authValidate = require("../middleware/authcheck")

Router.get("/", authValidate(["admin"]), ctrl.getUser)
Router.get("/info", authValidate(["admin", "user"]), ctrl.GetByUsername)
Router.post('/', ctrl.Add)
Router.put("/", authValidate(["admin", "user"]), ctrl.updateUser);

Router.delete("/:username", authValidate(["admin"]), ctrl.delete);


module.exports = Router