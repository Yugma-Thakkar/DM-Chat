const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const authMiddleware = require('../middleware/authMiddleware')

//display all users
router.get('/users', authMiddleware, usersController.displayUsers)

//find user and display
router.post('/find', usersController.findUser)

//login user
router.post('/', usersController.loginUser)

//logout user
router.post('/logout', usersController.logoutUser)

//delete users
router.delete('/remove', usersController.deleteUser)

//update user info
router.put('/update', usersController.updateUser)

module.exports = router
