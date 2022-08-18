const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const middleware = require('../middlewares/isAuth')

//DISPLAY REGISTER PAGE
router.get('/', middleware.isAuthUSER, usersController.renderRegister)

//REGISTER USER
router.post('/', usersController.addUser)

module.exports = router