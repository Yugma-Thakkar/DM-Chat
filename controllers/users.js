const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('../models/userSchema')


const session = require('express-session')
const bcrypt = require('bcryptjs')
const { raw } = require('express')

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//find user by username
exports.findUser = async (req, res) => {
    try {
        const response = await User.find({username: req.body.username})
        res.send(response)
    } catch (error) {
        console.error(error.message)
        res.send(`COULDN'T FIND ${req.body.username} IN DATABASE`)
    }
}

//render registration page
exports.renderRegister = (req, res) => {
    res.render('register')
}

//register user
exports.addUser = async (req, res) => {
    var {email ,username, password: PlainTextPassword, repassword} = req.body
    console.log(req.body)

    if (!email || typeof email !== 'string' || !username || typeof username !== 'string' || !PlainTextPassword || typeof PlainTextPassword !== 'string' || !repassword || typeof repassword !== 'string') {
        return res.send('INVALID INPUT')
    }

    if (PlainTextPassword !== repassword) return res.send(`PASSWORDS DO NOT MATCH`)
    const password = await bcrypt.hash(PlainTextPassword, 10)

    try {
        // const email = await User.findOne({email: email})
        // if(email !== null) {
        //     if (email.email === email) return res.send(`EMAIL ALREADY EXISTS`)
        //     else if (email.username === username) return res.send(`USERNAME ALREADY EXISTS`)
        // }

        // const user = await User.findOne({username: username})
        // if (user !== null) {
        //     if (user.email === email) return res.send(`EMAIL ALREADY EXISTS`)
        //     else if (user.username === username) return res.send(`USERNAME ALREADY EXISTS`)
        // }

        const response = await User.create({email, username, password})

        res.redirect('/user')
    } catch (error) {
        res.redirect('/register')
        console.error(error.message)
    } 
}

//login user
exports.loginUser = async (req, res) => {
    try {
        req.session.isAuth = true
        // console.log(req.session)
        const user = await User.findOne({username: req.body.username})
        if (user === null) return res.send(`${req.body.username} does not exist`)
        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isMatch) return res.send(`INCORRECT PASSWORD`)
        if (req.body.username !== user.username) return res.send(`INCORRECT USERNAME`)
        
        req.session.isAuth = true
        res.redirect('/chat')
    } catch(error) {
        res.send(`INCORRECT USERNAME`)
        console.error(error.message)
    }
}

//logout user
exports.logoutUser = async (req, res) => {
    req.session.destroy((error) => {
        if (error) throw error
        res.redirect('/user')
    })
}

//delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({username: req.body.username})
        res.send(`OK REMOVED ${user.username} FROM DATABASE`)
    } catch (error) {
        console.error(error)
        res.send(`COULDN'T FIND MATCH`)
    }
}

// display all users
exports.displayUsers = async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user)
    } catch (error) {
        console.error(error)
        res.send(`COULDN'T FETCH DATA`)
    }
}

//update user info
exports.updateUser = async (req, res) => {
    let o_user = req.body.username
    let up_user = req.body.up_username

    try {
    const user = await User.findOneAndUpdate({username: o_user}, {username: up_user})
    res.send(`OK UPDATED ${o_user} TO ${up_user}`)
    } catch (error) {
        console.error(error)
        res.send(`COULDN'T UPDATE ${o_user}`)
    }
}
