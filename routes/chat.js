const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

let messages = []

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

router.get('/message', (req, res) => {
    res.render('chat')
})

router.post('/message', (req, res) => {
    messages.push(req.body)
    res.send('OK SENT')
})

router.get('/display', (req, res) => {
    res.send(messages)
})

module.exports = router