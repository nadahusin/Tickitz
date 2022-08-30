const ctrl = {}
const model = require('../models/movie')
const respone = require("../helpers/respone")

ctrl.MovieDetail = async(req, res) => {
    try {
        const pagination = {
            page: req.query.page || 1,
            limit: req.query.limit || 5,
            order: req.query.order
        }
        const movie = await model.GetAll(pagination)
        return respone(res, 200, movie)
    } catch (error) {
        return respone(res, 500, "There is an Error", true)
    }
}

ctrl.GetByID = async(req, res) => {
    try {
        const id_movie = req.params.id_movie
        const movie = await model.GetById(id_movie)
        return respone(res, 200, movie);
    } catch (error) {
        return respone(res, 500, "There is an Error", true)
    }
}

ctrl.addMovie = async(req, res) => {
    try {
        const image = req.file.path
        const movie = await model.Add({...req.body, image })
        return respone(res, 200, movie)
    } catch (error) {
        return respone(res, 500, "There is an Error", true)
    }
}

ctrl.updateMovie = async(req, res) => {
    try {
        const movie = await model.Update({
            ...req.params,
            ...req.body,
            ...req.file
        })
        return respone(res, 200, movie)
    } catch (error) {
        return respone(res, 500, "There is an Error", true)
    }
}

ctrl.deleteMovie = async(req, res) => {
    try {
        const id_movie = req.params
        const movie = await model.Delete(id_movie)
        return respone(res, 200, movie);
    } catch (error) {
        return respone(res, 500, "There is an Error", true)
    }
}


ctrl.searchByTitle = async(req, res) => {
    try {
        const { title } = req.query
        const movie = title.toLowerCase()
        const data = await model.SearchTitle(movie)
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err)
    }
}

ctrl.searchByYear = async(req, res) => {
    try {
        const { release_date } = req.query
        const date = release_date.toLowerCase()
        const data = await model.SearchYear(date)
        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err)
    }
}

ctrl.Sorting = async(req, res) => {
    try {
        const { release_date } = req.query
        const data = await model.Sort(release_date)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = ctrl