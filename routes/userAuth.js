const express = require('express')
const path = require('path')
const router = express.Router()

const mongoose = require('mongoose')
const User = require('../models/userSchema')


router.get('/', (req, res) => {
    res.cookie('session_id', '123456').sendFile(path.join(__dirname, '../views/index.html'))
})

router.post('/', (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            console.error(error);
            res.send(`ERROR: COULDN'T ADD DATA`)
        }
        res.send(`OK ADDED ${req.body.username} TO DATABASE`)
    })
})

module.exports = router