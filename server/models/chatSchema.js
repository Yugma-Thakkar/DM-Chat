const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sentTime: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true
    }
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message