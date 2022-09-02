require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
const jwt = require('jsonwebtoken')
// const io = require('socket.io')(server)

app.use(cors())
const ejs = require('ejs')
app.set('view engine', 'ejs')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.once('open', () => {
    console.log(`MongoDB Connection established`)
})


//PARSE DATA
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//LOAD CSS
app.use(express.static('public'))

// const userAuthRoute = require('./routes/userAuth')
const usersRoute = require('./routes/user')
const chatRoute = require('./routes/chat')
const registerRoute = require('./routes/register')


app.use('/user', usersRoute)
app.use('/chat', chatRoute)
app.use('/register', registerRoute)

app.get('/', (req, res) => {
    res.redirect('/user')
})

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}...`)
})
