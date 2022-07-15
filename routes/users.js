const mongoose = require('mongoose')
const { Router } = require('express')
const router = Router()
const User = require('../models/userSchema')

router.get('/', (req, res) => {
    res.send(users)
})

router.post('/remove', (req, res) => {
    let found = false
    for (var i = 0; i < users.length; i++) {
        if (users[i].name == req.body.name) {
            found = true
            users.splice(i, 1)
            res.send('OK REMOVED')
            break
        }
    }
    if (found === false) {
        res.send('COULDN\'T FIND MATCH')
    }
})

module.exports = router
