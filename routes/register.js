const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

// const mongoose = require('mongoose')
// const User = require('../models/userSchema')

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        res.redirect('/chat')
    }
    else {
        next()
    }
}

//DISPLAY REGISTER PAGE
router.get('/', isAuth, usersController.renderRegister)

//REGISTER USER
router.post('/', usersController.addUser)

module.exports = router