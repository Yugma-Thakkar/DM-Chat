const express = require('express')
const app = express()
const mongoose = require('mongoose')

const Message = require('../models/chatSchema')


app.use(express.json())
app.use(express.urlencoded({extended: true}))

//RENDER CHAT PAGE
exports.chat = async (req, res) => {
    res.render('chat')
}

//SEND MESSAGES
exports.sendMessage = async (req, res) => {
    console.log(req.body)
    res.send(`${req.body.message}`)
}

//DISPLAY MESSAGES
exports.displayMessages = async (req, res) => {
    try {
        const messages = await Message.find({}) 
        res.send(messages)
    } catch (error) {
        console.error(error.message)
        res.send('COULDN\'T FIND MESSAGES')
    }
}