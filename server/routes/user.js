const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const authMiddleware = require('../middleware/authMiddleware')

//display all users
router.get('/users', usersController.displayUsers)

//find user and display
router.post('/find', usersController.findUser)

//login user
router.post('/', usersController.loginUser)

//refresh token
router.post('/refresh', usersController.refreshToken)

//logout user
router.post('/logout', usersController.logoutUser)

//delete users
router.delete('/remove', authMiddleware, usersController.deleteUser)

//update user info
router.put('/update', authMiddleware, usersController.updateUser)

module.exports = router
