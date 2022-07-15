const { Router } = require('express')
const path = require('path')
const router = Router()


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

router.get('/signup', (req, res) => {
    res.cookie('session_id', '123456')
    res.send('Signed in')
})

module.exports = router