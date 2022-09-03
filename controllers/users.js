const express = require('express')
const app = express()
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')

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

//REGISTER USER
exports.addUser = async (req, res) => {
    // //getting user input
    var {email ,username, password: PlainTextPassword, repassword} = req.body

    //check if email exists
    const CheckUser = await User.findOne({username})

    //check if username exists
    if (CheckUser) {
        //check if email exists
        if (CheckUser.email === email) {
            return res.json({status: 'FAIL', error: `${email} ALREADY EXISTS`})
        } 
        return res.json({status: 'FAIL', error: `USER ${username} ALREADY EXISTS`})
    } 

    //check if password is correct
    if (PlainTextPassword !== repassword) return res.json({status: 'FAIL', error: `PASSWORDS DO NOT MATCH`})

    //hash password
    const password = await bcrypt.hash(PlainTextPassword, 10)

    try {
        const user = await User.create({
            email,
            username,
            password
        })
        console.log('User created successfully: ', response)
        res.json({status: 'OK', message: `USER ${username} CREATED`, data: user})
    } 
    catch (error) {
        console.error(error.message)
        res.json({status: 'FAIL', message:`REGISTRATION UNSUCCESSFUL`, error: `${error.message}`})
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

        //check if username is correct
        if(username !== user.username) return res.json({status: 'FAIL', error: `USERNAME IS INCORRECT`})

        //send user data to client, if login is successful
        res.json({status: 'OK', message: `${user.username} LOGGED IN`,data: user})
    }
    catch (error) {
        console.error(error.message)
        res.json({status: 'FAIL', message: `LOGIN UNSUCCESSFUL`, error: `${error.message}`})
    }

}

// //LOGOUT USER
// exports.logoutUser = async (req, res) => {
//     //destroy session
//     req.session.destroy((error) => {
//         if (error) throw error
//         res.redirect('/user')
//     })
// }

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