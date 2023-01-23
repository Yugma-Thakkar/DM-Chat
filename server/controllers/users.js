const express = require('express')
const app = express()
const User = require('../models/userSchema')
// const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const uuid = require('uuid')

const bcrypt = require('bcryptjs')
const { raw } = require('express')

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//FIND USER BY USERNAME
exports.findUser = async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username})
        if (user) {
            return res.json({status: 'OK', message: `USER FOUND`, data: user})
        }
        return res.json({status: 'FAIL', message: `USER NOT FOUND`, error: `${req.body.username} DOES NOT EXIST`})
    } catch (error) {
        console.error(error.message)
        return res.json({status: 'FAIL', message: `USER NOT FOUND`, error: `${error.message}`})
    }
}

//REGISTER USER
exports.addUser = async (req, res) => {
    try {
        // getting user input
        var {email ,username, password: PlainTextPassword, repassword} = req.body
        console.log(email)

        //check if username exists
        const CheckUser = await User.findOne({username})
        if (CheckUser) {
            return res.json({status: 'FAIL', error: `USER ${username} ALREADY EXISTS`})
        } 
        //check if email exists
        const checkEmail = await User.findOne({email})
        if (checkEmail) {
            return res.json({status: 'FAIL', error: `EMAIL ${email} ALREADY EXISTS`})
        }

        //check if password is correct
        if (PlainTextPassword !== repassword) return res.json({status: 'FAIL', error: `PASSWORDS DO NOT MATCH`})

        //hash password
        const password = await bcrypt.hash(PlainTextPassword, 10)

        const user = await User.create({
            email,
            username,
            password
        })
        return res.json({status: 'OK', message: `USER ${username} CREATED`, data: user})
        console.log('User created successfully: ', response)
    } 
    catch (error) {
        console.error(error.message)
        return res.json({status: 'FAIL', message:`REGISTRATION UNSUCCESSFUL`, error: `${error.message}`})
    }
}

//LOGIN USER
exports.loginUser = async (req, res) => {

    var {username, password} = req.body

    try {
        //check if user exists
        const user = await User.findOne({username})
        if (!user) return res.json({status: 'FAIL', error: `${username} DOES NOT EXIST`})

        //check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.json({status: 'FAIL', error: `PASSWORD IS INCORRECT`})

        //send cookie to client
        const sessionID = uuid.v4()
        res.cookie('session', sessionID)
        //add cookie to database
        const cookie = await User.findOneAndUpdate({username}, {cookie: sessionID}, {new: true})

        //send user data to client, if login is successful
        return res.json({status: 'OK', message: `${user.username} LOGGED IN`, user: user})
    }
    catch (error) {
        console.error(error.message)
        return res.json({status: 'FAIL', message: `LOGIN UNSUCCESSFUL`, error: `${error.message}`})
    }

}

//LOGOUT USER
exports.logoutUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ username: req.body.username }, { cookie: null })
        return res.json({status: 'OK', message: `LOGGED OUT`})
    } catch (error) {
        console.error(error.message)
        return res.json({status: 'FAIL', message: `LOGOUT UNSUCCESSFUL`, error: `${error.message}`})
    }
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
        const user = await User.find({}).select('-password')
        return res.json({status: 'OK', message: `ALL USERS`, data: user})
    } catch (error) {
        console.error(error.message)
        return res.json({status: 'FAIL', message: `COULDN'T FIND MATCH`, error: `${error.message}`})
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