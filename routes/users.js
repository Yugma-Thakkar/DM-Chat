const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')


//display all users
router.get('/users', usersController.displayUsers)

//find user and display
router.post('/find', usersController.findUser)


//display login page
router.get('/', (req, res) => {
    res.render('login')
})

//login user
router.post('/', usersController.loginUser)

//delete users
router.post('/remove', usersController.deleteUser)

//update user info
router.post('/update', usersController.updateUser)

module.exports = router
