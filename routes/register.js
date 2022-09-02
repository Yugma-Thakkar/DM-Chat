const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')

//DISPLAY REGISTER PAGE
// router.get('/', usersController.renderRegister)

//REGISTER USER
router.post('/', usersController.addUser)

module.exports = router