require('dotenv').config()
const express = require('express')
const server = express()
const main = require('./src/main')
const db = require('./src/config/db')

db.connect()
    .then((r) => {
        server.use(express.urlencoded({ extended: true }))
        server.use(express.json())
        server.use('/images', express.static('images'))
        server.use('/api/v1', main)


        server.listen(process.env.APP_PORT, () => {
            console.log(`running ready on ${process.env.APP_PORT}`)
        })

    }).catch((error) => {
        console.log(error)
    })