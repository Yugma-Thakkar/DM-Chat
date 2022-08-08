const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

// const mongoose = require('mongoose')
// const User = require('../models/userSchema')

router.get('/', usersController.renderRegister)

router.post('/', usersController.addUser)

module.exports = router