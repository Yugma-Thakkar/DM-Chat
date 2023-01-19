const express = require('express')
const router = express.Router()

const chatControllers = require('../controllers/chats')
const roomControllers = require('../controllers/rooms')
// const authMiddleware = require('../middleware/authMiddleware')

//CREATE ROOM
router.post('/createRoom', roomControllers.createRoom)

//DISPLAY ALL ROOMS
router.post('/getRooms', roomControllers.getRooms)

//DISPLAY ROOM BY ID
router.post('/getRoomById', roomControllers.getRoomById)

//UPDATE ROOM BY ID
router.post('/updateRoomById', roomControllers.updateRoomById)

//FIND ROOM BY ID
router.post('/findRoomById', roomControllers.findRoomById)

//FIND ROOM BY NAME
router.post('/getRoomByName', roomControllers.findRoomByName)

//ADD USER TO ROOM
router.post('/addUserToRoom', roomControllers.addUserToRoom)

//REMOVE USER FROM ROOM
router.post('/removeUserFromRoom', roomControllers.removeUserFromRoom)

//DELETE ROOM BY ID
router.post('/deleteRoomById', roomControllers.deleteRoomById)

//DELETE ROOM BY NAME
router.post('/deleteRoomByName', roomControllers.deleteRoomByName)

//DELETE ALL ROOMS
router.post('/deleteAllRooms', roomControllers.deleteAllRooms)

module.exports = router