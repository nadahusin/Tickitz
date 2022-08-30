const express = require('express')
const Router = express.Router()
const authCheck = require('../middleware/authCheck')
const ctrl = require('../controllers/schedule')


Router.get("/", authValidate(["user", "admin"]), ctrl.Schedules)
Router.get('/sort', ctrl.Sorting)
Router.get('/search', ctrl.searchSchedule)


Router.post("/", authValidate(["admin"]), ctrl.addSchedule)
Router.put("/:id_schedule", authValidate(["admin"]), ctrl.updateSchedule)
Router.delete('/:id_schedule', authValidate(["admin"]), ctrl.deleteSchedule)

module.exports = Router