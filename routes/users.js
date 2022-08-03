const express = require('express')
const router = express.Router()
// const path = require('path')
// const bcrypt = require('bcryptjs')
const usersController = require('../controllers/users')

// const mongoose = require('mongoose')
// const User = require('../models/userSchema')

//display all users
router.get('/users', usersController.displayUsers)

//find user and display
router.post('/find', usersController.findUser)


//display login page
router.get('/', (req, res) => {
    res.render('login')
})

//create users
// router.post('/', async (req, res) => {
//     var {username, password: plainTextPassword} = req.body
//     const password = await bcrypt.hash(plainTextPassword, 10)

//     try {
//         username = username.trim()
//         const response = await User.create({username, password})
//         res.send(`OK ADDED ${response.username} TO DATABASE`)
//         console.log(response)
//     } catch (error) {
//         if (error.code === 11000) {
//             res.send(`USERNAME ALREADY EXISTS. PLEASE ENTER A UNIQUE USERNAME`)
//         }
//         else {
//             res.send(`COULDN'T ADD DATA`)
//         }
//         console.error(error.message)
//     } 
// })

//delete users
router.post('/remove', usersController.deleteUser)

//update user info
router.post('/update', usersController.updateUser)

module.exports = router
