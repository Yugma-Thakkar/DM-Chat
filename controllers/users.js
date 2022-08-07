const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('../models/userSchema')

const bcrypt = require('bcryptjs')
const { raw } = require('express')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

exports.findUser = async (req, res) => {
    try {
        const response = await User.find({username: req.body.username})
        res.send(response)
    } catch (error) {
        console.error(error.message)
        res.send(`COULDN'T FIND ${req.body.username} IN DATABASE`)
    }
}

exports.addUser = async (req, res) => {
    var {email ,username, password: plainTextPassword} = req.body
    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await User.create({email, username, password})
        res.cookie('1234').send(`OK ADDDED ${response.username} TO DATABASE`)
        console.log(response)
    } catch (error) {
        switch (error.code){
            case 11000:
                res.send(`USERNAME ALREADY EXISTS. PLEASE ENTER A UNIQUE USERNAME`)
                break
            default:
                res.send(`COULDN'T ADD DATA`)
                break
        }
        console.error(error.message)
    } 
}

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        const response = await bcrypt.compare(req.body.password, user.password)
        // console.log(`Response Password: ${response.password}`)
        // console.log(bcrypt.compare(req.body.password, response.password))
        if (response === true && req.body.username === user.username) {
            res.send(`LOGGED IN SUCCESSFULLY!`)
        }
        else res.send(`INCORRECT PASSWORD`)
    } catch(error) {
        console.error(error.message)
        res.send(`INCORRECT USERNAME`)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const response = await User.findOneAndDelete({username: req.body.username})
        res.send(`OK REMOVED ${response.username} FROM DATABASE`)
    } catch (error) {
        console.error(error)
        res.send(`COULDN'T FIND MATCH`)
    }
}

exports.displayUsers = async (req, res) => {
    try {
        const response = await User.find({})
        res.send(response)
    } catch (error) {
        console.error(error)
        res.send(`COULDN'T FETCH DATA`)
    }
}

exports.updateUser = (req, res) => {
    let o_user = req.body.username
    let up_user = req.body.up_username

    User.findOneAndUpdate({username: o_user}, {username: up_user}, (err, user) => {
        if (err) console.error(err)
        else res.send(`OK UPDATED ${user.username} to${up_user} IN DATABASE`)
    })
}