const express = require('express')
const router = express.Router()

const chatControllers = require('../controllers/chats')
const roomControllers = require('../controllers/rooms')
const authMiddleware = require('../middleware/authMiddleware')

//CREATE ROOM
router.post('/createRoom', authMiddleware, roomControllers.createRoom)

//DISPLAY ALL ROOMS
router.post('/getRooms', authMiddleware, roomControllers.getRooms)

//DISPLAY ROOM BY ID
router.post('/getRoomById', authMiddleware, roomControllers.getRoomById)

//UPDATE ROOM BY ID
router.post('/updateRoomById', authMiddleware, roomControllers.updateRoomById)

//FIND ROOM BY ID
router.post('/findRoomById', authMiddleware, roomControllers.findRoomById)

//FIND ROOM BY NAME
router.post('/getRoomByName', authMiddleware, roomControllers.findRoomByName)

//ADD USER TO ROOM
router.post('/addUserToRoom', authMiddleware, roomControllers.addUserToRoom)

//REMOVE USER FROM ROOM
router.post('/removeUserFromRoom', authMiddleware, roomControllers.removeUserFromRoom)

//DELETE ROOM BY ID
router.post('/deleteRoomById', authMiddleware, roomControllers.deleteRoomById)

//DELETE ROOM BY NAME
router.post('/deleteRoomByName', authMiddleware, roomControllers.deleteRoomByName)

//DELETE ALL ROOMS
router.post('/deleteAllRooms', authMiddleware, roomControllers.deleteAllRooms)

module.exports = router