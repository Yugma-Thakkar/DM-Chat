const express = require('express')
const app = express()

const Room = require('../models/roomSchema')
const Message = require('../models/chatSchema')
const User = require('../models/userSchema')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//GET ALL MESSAGES
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find()
        res.json({ status: 'OK', messages: messages })
    } catch (error) {
        console.error(error.message)
        res.json({ status: 'ERROR', message: `${error.message}`})
    }
}

//GET ALL MESSAGES FROM A USER
exports.getMessagesFromUser = async (req, res) => {
    try {
        const messages = await Message.find({ username: req.params.sender })
        res.json({ status: 'OK', messages: messages })
    } catch (error) {
        console.error(error.message)
        res.json({ status: 'ERROR', message: `${error.message}`})
    }
}

//SEND MESSAGES
exports.sendMessage = async (req, res) => {
    try {
        if (req.body.message != null) {
            const user = await User.findOne({ username: req.body.username})
            const message = await Message.create({
                message: req.body.message,
                username: req.body.username,
                userId: user._id
            })
            res.json({ status: 'OK', message: `(${req.body.message}) sent` })
        }
           
    } catch (error) {
        console.error(error.message)
        res.json({ status: 'ERROR', message: `${error.message}`})
    }
}

//DISPLAY MESSAGES
exports.displayMessages = async (req, res) => {
    try {
        const messages = await Message.find({})
        res.send(messages)
    } catch (error) {
        console.error(error.message)
        res.send('COULDN\'T DISPLAY MESSAGES')
    }
}