const express = require('express')
const app = express()

const Message = require('../models/chatSchema')
const User = require('../models/userSchema')
const Room = require('../models/roomSchema')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//CREATE ROOM
exports.createRoom = async (req, res) => {
    try {
        const {roomName, roomDescription, users} = req.body
        const room = new Room({roomName, roomDescription, users})
        await room.save()
        res.status(201).json({room: room, message: "Room created successfully"})
    }
    catch (error) {
        console.error(error)
        res.status(500).json({message: "Server error", error: `${error}`})
    }
}

//DISPLAY ALL ROOMS
exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({})
        res.status(200).json({rooms: rooms, message: "Rooms found successfully"})
    }
    catch (error) {
        console.error(error)
        res.status(500).json({message: "Server error", error: `${error}`})
    }
}

//DISPLAY ROOM BY ID
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.body.roomId)
        res.status(200).json({room: room, message: "Room found successfully"})
    }
    catch (error) {
        console.error(error)
        res.status(500).json({message: "Server error", error: `${error}`})
    }
}

//UPDATE ROOM BY ID
exports.updateRoomById = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.roomId, req.body, {new: true})
        res.status(200).json({room: room, message: "Room updated successfully"})
    }
    catch (error) {
        console.error(error)
        res.status(500).json({message: "Server error", error: `${error}`})
    }
}

//DELETE ROOM BY ID
exports.deleteRoomById = async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.body.roomId)
        res.status(200).json({message: "Room deleted successfully"})
    }
    catch (error) {
        console.error(error)
        res.status(500).json({message: "Server error", error: `${error}`})
    }
}

//FIND ROOM BY NAME
exports.getRoomByName = async (req, res) => {
    try {
        const room = await Room.findOne({name: req.body.roomName})
        res.status(200).json({room: room, message: "Room found successfully"})
    }
    catch (error) {
        console.error(error)
        res.status(500).json({message: "Server error", error: `${error}`})
    }
}

//ADD USER TO ROOM
exports.addUserToRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.body.roomId)
        const user = await User.findById(req.body.userId)
        if (room.isGroup === true) {
            room.users.push(user)
            await room.save()
            res.status(200).json({room: room, message: "User added to room successfully"})
        }
        else {
            res.status(400).json({message: "Cannot add user to private room"})
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({message: "Server error", error: `${error}`})
    }
}

//REMOVE USER FROM ROOM
exports.removeUserFromRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.body.roomId)
        const user = await User.findById(req.body.userId)
        if (room.isGroup === true) {
            room.users.pull(user)
            await room.save()
            res.status(200).json({room: room, message: "User removed from room successfully"})
        }
        else {
            res.status(400).json({message: "Cannot remove user from private room"})
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json({message: "Server error", error: `${error}`})
    }
}

//DELETE ROOM
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.body.roomId)
        await room.delete()
        res.status(200).json({message: "Room deleted successfully"})
    }
    catch (error) {
        console.error(error)
        res.status(500).json({message: "Server error", error: `${error}`})
    }
}