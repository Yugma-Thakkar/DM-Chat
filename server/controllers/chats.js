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
            const user = await User.findOne({ username: req.body.username.replaceAll('"', '')})
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
    // req.body.senderId = req.session.user._id
    // req.body.sender = req.session.user.username

    // try {
    //     const message = await Message.create(req.body)
    //     const user = await User.findById(req.body.senderId)
    //     res.send(`${message.message}, ${user.username}`)
    // } catch (error) {
    //     console.error(error.message)
    //     res.send('COULDN\'T SEND MESSAGE')
    // }
}

//DISPLAY MESSAGES
// exports.displayMessages = async (req, res) => {
//     try {
//         const messages = await Message.find({})
//         res.send(messages)
//     } catch (error) {
//         console.error(error.message)
//         res.send('COULDN\'T DISPLAY MESSAGES')
//     }
// }