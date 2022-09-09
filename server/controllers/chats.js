const express = require('express')
const app = express()

const Message = require('../models/chatSchema')
const User = require('../models/userSchema')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//RENDER CHAT PAGE
// exports.chat = async (req, res) => {
//     console.log(req.session)
//     res.render('chat', { username: req.session.user.username })
// }

//SEND MESSAGES
exports.sendMessage = async (req, res) => {
    try {
        if (req.body.message != null) {
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