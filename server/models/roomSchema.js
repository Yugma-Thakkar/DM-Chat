const mongoose = require("mongoose")
const User = require("./userSchema")
const Message = require("./chatSchema")

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.String,
        ref: "User",
        required: true
    }],
    roomDescription: {
        type: String
    },
    roomCreater: {
        type: mongoose.Schema.Types.String,
        ref: "User",
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.String,
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
    },
    latestMessage: {
        type: mongoose.Schema.Types.String,
        ref: "Message"
    }
})

const Room = mongoose.model('Room', roomSchema)
module.exports = Room