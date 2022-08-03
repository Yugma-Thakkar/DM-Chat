const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')

const mongoose = require('mongoose')
const User = require('../models/userSchema')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', async (req, res) => {
    var {email ,username, password: plainTextPassword} = req.body
    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await User.create({email, username, password})
        res.cookie('1234').send(`OK ADDDED ${response.username} TO DATABASE`)
        console.log(response)
    } catch (error) {
        if (error.code === 11000) {
            res.send(`USERNAME ALREADY EXISTS. PLEASE ENTER A UNIQUE USERNAME`)
        }
        else {
            res.send(`COULDN'T ADD DATA`)
        }
        console.error(error.message)
    } 
})

module.exports = router