const ctrl = {}
const model = require('../models/booking')
const respone = require("../helpers/respone")

ctrl.Booked = async(req, res) => {
    try {
        const pagination = {
            page: req.query.page || 1,
            limit: req.query.limit || 5,
            order: req.query.order
        }
        const booking = await modelBook.GetALL(pagination)
        return respone(res, 200, booking)
    } catch (error) {
        return respone(res, 500, "There is an Error", true)
    }
}

ctrl.addBooked = async(req, res) => {
    try {
        const { movie_selected, date, time, ticket_price, seat_choosed, total_payment } = req.body
        const data = await model.Add({ movie_selected, date, time, ticket_price, seat_choosed, total_payment, images })
        return respone(res, 200, booking);
    } catch (error) {
        return respone(res, 500, "There is an Error", true);
    }
}

ctrl.updateBooked = async(req, res) => {
    try {
        const id_booked = req.params.id_booked
        const { movie_selected, date, time, ticket_price, seat_choosed, total_payment } = req.body
        const data = await model.Update(id_booked, { movie_selected, date, time, ticket_price, seat_choosed, total_payment })
        return respone(res, 200, booking);
    } catch (error) {
        return respone(res, 500, "There is an Error", true);
    }
}

ctrl.deleteBooked = async(req, res) => {
    try {
        const id_booked = req.params.id_booked
        const data = await model.Delete(id_booked, req.body)
        return respone(res, 200, booking);
    } catch (error) {
        return respone(res, 500, "There is an Error", true);
    }
}

ctrl.searchBooked = async(req, res) => {
    try {
        const { movie_selected } = req.query
        const booked = movie_selected.toLowerCase()
        const data = await model.Search(booked)
        return respone(res, 200, booking);
    } catch (error) {
        return respone(res, 500, "There is an Error", true);
    }
}

ctrl.Sorting = async(req, res) => {
    try {
        const data = await model.Sort()
        return respone(res, 200, booking);
    } catch (error) {
        return respone(res, 500, "There is an Error", true);
    }
}

module.exports = ctrl