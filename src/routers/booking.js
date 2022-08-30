const express = require('express')
const Router = express.Router()
const authCheck = require('../middleware/authCheck')
const ctrl = require('../controllers/booking')


Router.get("/", authValidate(["admin", "user"]), ctrl.Booked)
Router.get('/search', ctrl.searchBooked)
Router.get('/sort', ctrl.Sorting)


Router.post("/", authValidate(["admin"]), ctrl.addBooked)
Router.put("/:id_booking", authValidate(["admin"]), ctrl.updateBooked)
Router.delete("/:id_booking", authValidate(["admin"]), ctrl.deleteBooked)



module.exports = Router