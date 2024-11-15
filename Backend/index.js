const express = require('express')
const cors = require('cors')
const http = require('http')
// const socketio = require('socket.io')

const app = express()
const port = 3000

const UserController = require('./Controllers/UserController')
const GroupController = require('./Controllers/GroupController')
const MessageController = require('./Controllers/MessageController')
const authController = require('./Controllers/authController')
const initializeSocket = require('./Middlewares/socket')

require('./config/DbConnect')

const server = http.createServer(app)
const io = initializeSocket(server)
app.use(express.json())

app.use(
  cors({
    origin: 'http://127.0.0.1:5173', //localhost origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
)

// Middleware to add io to req
app.use((req, res, next) => {
  req.io = io
  next()
})

app.use('/users', UserController)
app.use('/groups', GroupController)
app.use('/messages', MessageController)
app.use('/auth', authController)

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
