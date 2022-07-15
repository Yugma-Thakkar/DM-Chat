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
db.on('error', (error) => console.error(error))
db.once('open', () => console.log(`Connected to Database`))

const userAuthRoute = require('./routes/userAuth')
const usersRoute = require('./routes/users')
const chatRoute = require('./routes/chat')

// let port = 4000

// app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.post('/', (req, res) => {
    
// })

app.use('/auth', userAuthRoute)
app.use('/user', usersRoute)
app.use('/chat', chatRoute)

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}...`)
})
