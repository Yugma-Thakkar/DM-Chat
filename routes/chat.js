const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const chatControllers = require('../controllers/chats')

const session = require('express-session')

const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        next()
    } else {
        res.redirect('/user')
    }
}

//RENDER CHAT PAGE
router.get('/', isAuth, chatControllers.chat)

router.post('/delete', (req, res) => {
    let found = false
    for (var i = 0; i < messages.length; i++) {
        if (messages[i].message == req.body.message) {
            found = true
            messages.splice(i, 1)
            res.send('OK REMOVED')
            break
        }
    }
    if (found === false) {
        res.send('COULDN\'T FIND MATCH')
    }
})

//SEND MESSAGES
router.post('/', isAuth, chatControllers.sendMessage)

//DISPLAY MESSAGES
router.get('/display', chatControllers.displayMessages)

module.exports = router