const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
const chatControllers = require('../controllers/chats')
const roomControllers = require('../controllers/rooms')
const authMiddleware = require('../middleware/authMiddleware')

//SEND MESSAGES
router.post('/', chatControllers.sendMessage)

// //DISPLAY MESSAGES
// router.get('/display', chatControllers.displayMessages)

module.exports = router