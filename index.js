require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
// const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.once('open', () => {
    console.log(`Connection established`)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const userAuthRoute = require('./routes/userAuth')
const usersRoute = require('./routes/users')
const chatRoute = require('./routes/chat')

app.use('/auth', userAuthRoute)
app.use('/user', usersRoute)
app.use('/chat', chatRoute)

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}...`)
})
