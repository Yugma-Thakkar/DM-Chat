const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

// const mongoose = require('mongoose')
// const User = require('../models/userSchema')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', usersController.addUser)

module.exports = router