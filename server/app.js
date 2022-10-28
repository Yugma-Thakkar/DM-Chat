//TODO: IMPLEMENT AUTOMATIC REFRESH TOKENS, SOCKET.IO

require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
const jwt = require('jsonwebtoken')
// const io = require('socket.io')(3000, { 
//         cors: ["http://localhost:5173"]
//     }
// )

app.use(cors())


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
const roomRoute = require('./routes/room')
const registerRoute = require('./routes/register')


app.use('/user', usersRoute)
app.use('/chat', chatRoute)
app.use('/room', roomRoute)
app.use('/register', registerRoute)

// app.get('/', (req, res) => {
//     res.redirect('/user')
// })

// io.on('connection', (socket) => {
//     // console.log('New user connected')
// })

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}...`)
})
