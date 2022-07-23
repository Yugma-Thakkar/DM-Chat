const express = require('express')
const router = express.Router()
const path = require('path')
const bcrypt = require('bcryptjs')

const mongoose = require('mongoose')
const User = require('../models/userSchema')

//display all users
router.get('/users', async (req, res) => {
    try {
        const response = await User.find({})
        res.send(response)
    } catch (error) {
        console.error(error)
        res.send(`COULDN'T FETCH DATA`)
    }
})

//find user and display
router.post('/find', async (req, res) => {
    try {
        const response = await User.find({username: req.body.username})
        res.send(response)
    } catch (error) {
        console.error(error)
        res.send(`COULDN'T FIND ${req.body.username} IN DATABASE`)
    }
})


//display login page
router.get('/', (req, res) => {
    res.render('login')
})

//create users
router.post('/', async (req, res) => {
    const {username, password: plainTextPassword} = req.body
    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await User.create({username, password})
        res.send(`OK ADDED ${response.username} TO DATABASE`)
        console.log(user)
    } catch (error) {
        console.error(error)
        res.send(`COULDN'T ADD DATA`)
    } 
})

//delete users
router.post('/remove', async (req, res) => {
    try {
        const response = await User.findOneAndDelete({username: req.body.username})
        res.send(`OK REMOVED ${response.username} FROM DATABASE`)
    } catch (error) {
        console.error(error)
        res.send(`COULDN'T FIND MATCH`)
    }

    // User.findOneAndDelete({username: user}, (err, D_user) => {
    //     if (err) {
    //         console.error(err)
    //     }
    //     else {
    //         found = true
    //         res.send(`OK DELETED ${D_user.username} FROM DATABASE`)
    //     }
    // if (found === false) res.send(`COULDN'T FIND MATCH`)
    // })
})

//update user info
router.post('/update', (req, res) => {
    let o_user = req.body.username
    let up_user = req.body.up_username

    User.findOneAndUpdate({username: o_user}, {username: up_user}, (err, user) => {
        if (err) console.error(err)
        else res.send(`OK UPDATED ${user.username} to${up_user} IN DATABASE`)
    })
})

module.exports = router
