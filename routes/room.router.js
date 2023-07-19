const express = require('express')
const { CreateRoom, JoinRoom } = require('../controller/room.controller')
const roomrouter = express.Router()

roomrouter.post("/create", CreateRoom)


roomrouter.post("/join", JoinRoom)

module.exports = roomrouter