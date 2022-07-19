const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const User = require('../models/userSchema')

router.get('/', (req, res) => {
    User.find({}).exec((error, users) => {
        res.send(users)
    })
})

router.get('/find/:name', (req, res) => {
    var temp = req.params.name
    User.find({temp}).exec((error, user) => {
        res.send(user)
    })
})

router.post('/remove', (req, res) => {
    let found = false
    let user = req.body.username

    User.deleteOne({user}).exec((error) => {
        if (error) console.error(error)
        else found = true
    })
    if (found === false) {
        res.send('COULDN\'T FIND MATCH')
    }
})

module.exports = router
