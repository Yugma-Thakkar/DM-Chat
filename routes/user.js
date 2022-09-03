const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const authMiddleware = require('../middleware/authMiddleware')

//display all users
router.get('/users', authMiddleware, usersController.displayUsers)

//find user and display
router.post('/find', usersController.findUser)


//display login page
// router.get('/', usersController.renderLogin)

//login user
router.post('/', usersController.loginUser)

//logout user
// router.post('/logout', usersController.logoutUser)

//delete users
router.delete('/remove', authMiddleware, usersController.deleteUser)

//update user info
router.put('/update', authMiddleware, usersController.updateUser)

module.exports = router
