const express = require('express')
const cors = require('cors')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const port = 3000

const UserController = require('./Controllers/UserController')
const GroupController = require('./Controllers/GroupController')
const MessageController = require('./Controllers/MessageController')
const authController = require('./Controllers/authController')

require('./config/DbConnect')

app.use(express.json())
app.use(cors())

// Middleware to add io to req
app.use((req, res, next) => {
  console.log('Middleware called')
  req.io = io
  next()
})

app.use('/users', UserController)
app.use('/groups', GroupController)
app.use('/messages', MessageController)
app.use('/auth', authController)

const server = http.createServer(app)
const io = socketio(server)

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
