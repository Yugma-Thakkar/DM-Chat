const mongoose = require("mongoose")
const User = require("./userSchema")
const Message = require("./chatSchema")

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    description: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: true
    }],
    createdOn: {
        type: Date,
        default: Date.now
    },
    isGroup: {
        type: Boolean,
        default: false
    }
})

const Room = mongoose.model('Room', roomSchema)
module.exports = Room