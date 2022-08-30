const express = require('express')
const Routers = express.Router()

const movies = require('./routers/movie')
const booked = require('./routers/booking')
const schedule = require('./routers/schedule')
const user = require('./routers/users')
const auth = require('./routers/auth')

Routers.use('/movie', movies)
Routers.use('/booking', booked)
Routers.use('/schedule', schedule)
Routers.use('/users', user)
Routers.use('/auth', auth)


module.exports = Routers