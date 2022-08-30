const express = require('express')
const Router = express.Router()
const authCheck = require('../middleware/authCheck')
const ctrl = require('../controllers/movie')
const upload = require('../middleware/upload')

Router.get('/:id_movie', authValidate(["user", "admin"]), ctrl.GetByID)
outer.get('/', authValidate(["user", "admin"]), ctrl.MovieDetail)
Router.get('/search', ctrl.searchByTitle)
Router.get('/date', ctrl.searchByYear)
Router.get('/sorting', ctrl.Sorting)


Router.post('/', authValidate(["admin"]), upload.single('image'), ctrl.addMovie)
Router.put('/:id_movie', authValidate(["admin"]), upload.single('image'), ctrl.updateMovie)
Router.delete('/:id_movie', authValidate(["admin"]), ctrl.delete)



module.exports = Router