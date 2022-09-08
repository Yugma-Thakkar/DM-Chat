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
    try {
        // getting user input
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
        res.json({status: 'FAIL', message:`REGISTRATION UNSUCCESSFUL`, error: `${error.message}`})
    }
}

//GENERATE ACCESS TOKEN
function generateAccessToken(id) {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30s'})
}

//GENERATE REFRESH TOKEN
function generateRefreshToken(id) {
    return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET)
}

//STORING REFRESH TOKENS
let refreshTokens = []

//REFRESH TOKEN
exports.refreshToken = async (req, res) => {
    //take token from user
    const refreshToken = req.body.token
    //check if token exists
    if (refreshToken == null) return res.json({status: 'FAIL', message: `YOU ARE NOT AUTHENTICATED`, error: `REFRESH TOKEN DOES NOT EXIST`})
    //check if token in refreshTokens array
    if (!refreshTokens.includes(refreshToken)) return res.json({status: 'FAIL', message: `YOU ARE NOT AUTHENTICATED`, error: `REFRESH TOKEN INVALID`})

    //check if token is valid and generate new token
    const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) 
    try {
        const newAccessToken = generateAccessToken({id: decoded.id})
        const newRefreshToken = generateRefreshToken({id: decoded.id})

        //store new refresh token
        refreshTokens.push(newRefreshToken)

        //send new token to client
        res.json({status: 'OK', message: `TOKEN REFRESHED`, accessToken: newAccessToken, refreshToken: newRefreshToken})
    } catch (error) {
        console.error(error.message)
        res.json({status: 'FAIL', message: `REFRESH TOKEN GENERATION UNSUCCESSFUL`, error: `${error.message}`})
    }
}

//LOGIN USER
exports.loginUser = async (req, res) => {

    var {username, password} = req.body

    try {
        //check if user exists
        const user = await User.findOne({username})
        if (!user) return res.json({status: 'FAIL', error: `${username} DOES NOT EXIST`})

        // console.log(user)
        
        // //check if user already logged in
        // if (req.user.accessToken) {
        //     return res.json({status: 'FAIL', message: `USER ALREADY LOGGED IN`, error: `${user.username} ALREADY LOGGED IN`})
        // }

        //check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.json({status: 'FAIL', error: `PASSWORD IS INCORRECT`})

        //check if username is correct
        if(username !== user.username) return res.json({status: 'FAIL', error: `USERNAME IS INCORRECT`})

        //generate access token
        const AccessToken = generateAccessToken(user._id)
        //generate refresh token
        const RefreshToken = generateRefreshToken(user._id)
        //store refresh token
        refreshTokens.push(RefreshToken)

        //send user data & token to client, if login is successful
        res.json({status: 'OK', message: `${user.username} LOGGED IN`,user: user, accessToken: AccessToken, refreshToken: RefreshToken})
    }
    catch (error) {
        console.error(error.message)
        res.json({status: 'FAIL', message: `LOGIN UNSUCCESSFUL`, error: `${error.message}`})
    }

}

//LOGOUT USER
exports.logoutUser = async (req, res) => {
    try {
        //take token from user
        const refreshToken = req.body.token
        //check if token exists
        if (refreshToken == null) return res.json({status: 'FAIL', message: `YOU ARE NOT AUTHENTICATED`, error: `REFRESH TOKEN DOES NOT EXIST`})
        //check if token in refreshTokens array
        if (!refreshTokens.includes(refreshToken)) return res.json({status: 'FAIL', message: `YOU ARE NOT AUTHENTICATED`, error: `REFRESH TOKEN INVALID`})

        //delete token from refreshTokens array
        refreshTokens = refreshTokens.filter(token => token !== refreshToken)

        res.json({status: 'OK', message: `LOGGED OUT`})
    } catch (error) {
        console.error(error.message)
        res.json({status: 'FAIL', message: `LOGOUT UNSUCCESSFUL`, error: `${error.message}`})
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