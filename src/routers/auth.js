const express = require("express");
const Router = express.Router();
const ctrl = require("../controllers/auth");

Router.post("/", ctrl.Login)

module.exports = Router