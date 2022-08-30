const ctrl = {}
const model = require('../models/schedule')
const respone = require("../helpers/respone")


ctrl.Schedule = async(req, res) => {
    try {
        const pagination = {
            page: req.query.page || 1,
            limit: req.query.limit || 5,
            order: req.query.order
        }
        const schedule = await modelScd.GetAll(pagination)
        return respone(res, 200, schedule)
    } catch (error) {
        return respone(res, 500, "There is an Error", true)
    }
}

ctrl.addSchedule = async(req, res) => {
    try {
        const { month, title, day, time } = req.body
        const data = await model.Add({ month, title, day, time, images })
        return respone(res, 200, schedule)
    } catch (error) {
        return respone(res, 500, "There is an Error", true)
    }
}

ctrl.updateSchedule = async(req, res) => {
    try {
        const id_schedule = req.params.id_schedule
        const { month, title, day, time } = req.body
        const data = await model.Update(id_schedule, { month, title, day, time })
        return respone(res, 200, schedule)
    } catch (error) {
        return respone(res, 500, "There is an Error", true)
    }
}

ctrl.deleteSchedule = async(req, res) => {
    try {
        const id_schedule = req.params.id_schedule
        const { month, title, day, time } = req.body
        const data = await model.DeleteSchedule(id_schedule, { month, title, day, time })
        return respone(res, 200, schedule)
    } catch (error) {
        return respone(res, 500, "There is an Error", true)
    }
}
ctrl.searchSchedule = async(req, res) => {
    try {
        const { title } = req.query
        const schedule = title.toLowerCase()
        const data = await model.SearchSchedule(schedule)
        return respone(res, 200, schedule)
    } catch (error) {
        return respone(res, 500, "There is an Error", true)
    }
}
ctrl.Sorting = async(req, res) => {
    try {
        const data = await model.SortSchedule()
        return respone(res, 200, schedule)
    } catch (error) {
        return respone(res, 500, "There is an Error", true)
    }
}

module.exports = ctrl