const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    cookie: {
        type: String,
        default: null
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User