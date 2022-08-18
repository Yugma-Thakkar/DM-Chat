const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const middleware = require('../middlewares/isAuth')


// const isAuth = (req, res, next) => {
//     if (req.session.isAuth) {
//         res.redirect('/chat')
//     }
//     else {
//         next()
//     }
// }

//display all users
router.get('/users', usersController.displayUsers)

//find user and display
router.post('/find', usersController.findUser)


//display login page
router.get('/', middleware.isAuthUSER, usersController.renderLogin)

//login user
router.post('/', usersController.loginUser)

//logout user
router.post('/logout', usersController.logoutUser)

//delete users
router.post('/remove', usersController.deleteUser)

//update user info
router.post('/update', usersController.updateUser)

module.exports = router
