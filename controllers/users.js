const express = require('express')
const app = express()
const User = require('../models/userSchema')


const session = require('express-session')
const bcrypt = require('bcryptjs')
const { raw } = require('express')

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//FIND USER BY USERNAME
exports.findUser = async (req, res) => {
    try {
        const response = await User.find({username: req.body.username})
        res.send(response)
    } catch (error) {
        console.error(error.message)
        res.send(`COULDN'T FIND ${req.body.username} IN DATABASE`)
    }
}

//RENDER LOGIN PAGE
exports.renderLogin = (req, res) => {
    res.render('login')
}

//RENDER REGISTER PAGE
exports.renderRegister = (req, res) => {
    res.render('register')
}

//REGISTER USER
exports.addUser = async (req, res) => {
    //check if a user is alredy logged in
    // if (req.session.isAuth) {
    //     return res.send('YOU ARE ALREADY LOGGED IN')
    // }

    // //getting user input
    var {email ,username, password: PlainTextPassword, repassword} = req.body
    console.log(req.body)

    // //validate user input
    // if (!email || typeof email !== 'string' || !username || typeof username !== 'string' || !PlainTextPassword || typeof PlainTextPassword !== 'string' || !repassword || typeof repassword !== 'string') {
    //     return res.send('INVALID INPUT')
    // }

    //check if password and repassword match
    const password = await bcrypt.hash(PlainTextPassword, 10)
    if (PlainTextPassword !== repassword) return res.json({status: "FAIL", error: `PASSWORDS DO NOT MATCH`})

    // //register user
    try {
        const response = await User.create({email, username, password})
        res.json({status: 'OK'})
        // res.redirect('/user')
    } catch (error) {
        // res.redirect('/register')
        res.json({status: 'FAIL'})
        console.error(error.message)
    } 
}

//LOGIN USER
exports.loginUser = async (req, res) => {
    //check if a user is alredy logged in
    if (req.session.isAuth) {
        return res.send('YOU ARE ALREADY LOGGED IN')
    }

    try {
        // req.session.isAuth = true
        // console.log(req.session)
        const user = await User.findOne({username: req.body.username})
        // console.log(user, req.body.username)
        if (user === null) return res.send(`${req.body.username} does not exist`)
        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isMatch) return res.send(`INCORRECT PASSWORD`)
        if (req.body.username !== user.username) return res.send(`INCORRECT USERNAME`)
        
        req.session.isAuth = true
        req.session.user = user
        res.redirect('/chat')
    } catch(error) {
        res.send(`INCORRECT USERNAME`)
        console.error(error.message)
    }
}

//LOGOUT USER
exports.logoutUser = async (req, res) => {
    //destroy session
    req.session.destroy((error) => {
        if (error) throw error
        res.redirect('/user')
    })
}

//DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({username: req.body.username})
        res.send(`OK REMOVED ${user.username} FROM DATABASE`)
    } catch (error) {
        console.error(error.message)
        res.send(`COULDN'T FIND MATCH`)
    }
}

//DISPLAY ALL USERS
exports.displayUsers = async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send(`COULDN'T FETCH DATA`)
    }
}

//UPDATE USER INFO
exports.updateUser = async (req, res) => {
    let o_user = req.body.username
    let up_user = req.body.up_username

    try {
    const user = await User.findOneAndUpdate({username: o_user}, {username: up_user})
    res.send(`OK UPDATED ${o_user} TO ${up_user}`)
    } catch (error) {
        console.error(error.message)
        res.send(`COULDN'T UPDATE ${o_user}`)
    }
}