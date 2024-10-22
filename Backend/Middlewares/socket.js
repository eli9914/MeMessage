// socket.js
const socketio = require('socket.io')

const initializeSocket = (server) => {
  const io = socketio(server, {
    cors: {
      origin: 'http://127.0.0.1:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id)

    // Handle joining the room
    socket.on('join', (userId) => {
      socket.join(userId)
      console.log(`${userId} has joined their room`)
    })

    // Listen for 'send_message' event
    socket.on('send_message', (data) => {
      if (data.recipients) {
        io.to(data.recipients).emit('receive_message', data)
      } else if (data.groupId) {
        io.to(data.groupId).emit('receive_message', data)
      }
    })

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })

  return io
}

module.exports = initializeSocket
