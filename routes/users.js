const express = require('express')
const router = express.Router()
const path = require('path')

const mongoose = require('mongoose')
const User = require('../models/userSchema')

//display all users
router.get('/users', (req, res) => {
    User.find({}).exec((error, users) => {
        res.send(users)
    })
})

//find user and display
router.get('/find/:name', (req, res) => {
    var temp = req.params.name
    User.find({temp}).exec((error, user) => {
        res.send(user)
    })
})

//display login page
router.get('/', (req, res) => {
    res.render('login')
})

//create users
router.post('/', (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            console.error(error)
            res.send(`ERROR: COULDN'T ADD DATA`)
        }
        res.send(`OK ADDED ${user.username} to DATABASE`)
    })
})

//delete users
router.post('/remove', (req, res) => {
    let found = false
    let user = req.body.username

    User.findOneAndDelete({username: user}, (err, D_user) => {
        if (err) {
            console.error(err)
        }
        else {
            found = true
            res.send(`OK DELETED ${D_user.username} FROM DATABASE`)
        }
    if (found === false) res.send(`COULDN'T FIND MATCH`)
    })
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
