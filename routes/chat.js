const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
// const chatControllers = require('../controllers/chats')
// const session = require('express-session')



// //RENDER CHAT PAGE
// router.get('/', chatControllers.chat)

// router.post('/delete', (req, res) => {
//     let found = false
//     for (var i = 0; i < messages.length; i++) {
//         if (messages[i].message == req.body.message) {
//             found = true
//             messages.splice(i, 1)
//             res.send('OK REMOVED')
//             break
//         }
//     }
//     if (found === false) {
//         res.send('COULDN\'T FIND MATCH')
//     }
// })

// //SEND MESSAGES
// router.post('/', chatControllers.sendMessage)

// //DISPLAY MESSAGES
// router.get('/display', chatControllers.displayMessages)

module.exports = router