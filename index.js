const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/users', {
    useNewUrlParser: true
})

const userAuthRoute = require('./routes/userAuth')
const usersRoute = require('./routes/users')
const chatRoute = require('./routes/chat')

const path = require('path')
let port = 3000

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.post('/', (req, res) => {
    
// })

app.use('/auth', userAuthRoute)
app.use('/user', usersRoute)
app.use('/chat', chatRoute)

app.listen(process.env.PORT || port, () => {
    console.log(`Listening to port ${port}...`)
})
