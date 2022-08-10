const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    // users:[{
    //     users: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User',
    //         required: true
    //     }
    // }],
    message: {
        type: String,
        required: true
    },
    sentTime: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model('Message', messageSchema)