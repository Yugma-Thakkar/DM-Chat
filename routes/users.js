const express = require('express')
const router = express.Router()
const path = require('path')

const mongoose = require('mongoose')
const User = require('../models/userSchema')

router.get('/users', (req, res) => {
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

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

router.post('/', (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            console.error(error)
            res.send(`ERROR: COULDN'T ADD DATA`)
        }
        res.send(`OK ADDED ${req.body.username} to DATABASE`)
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
