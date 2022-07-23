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
    // mail_id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User