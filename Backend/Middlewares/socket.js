// socket.js
const socketio = require('socket.io')
const groupService = require('../services/groupService')

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
    socket.on('join_group', (groupId) => {
      socket.join(groupId)
      console.log(`${socket.id} has joined group room: ${groupId}`)
    })

    socket.on('send_group_message', async (data) => {
      try {
        const group = await groupService.getGroupById(data.group)
        console.log('msg:', data)
        console.log('Group:', group)

        if (group && group.members) {
          // Emit the message to each member in the group except the sender
          group.members.forEach((memberId) => {
            if (memberId.toString() !== data.sender) {
              // Exclude the sender
              io.to(memberId.toString()).emit('receive_group_message', data)
            }
          })
        }
      } catch (error) {
        console.error('Error sending group message:', error)
      }
    })

    // Listen for 'send_message' event
    socket.on('send_message', (data) => {
      if (data.recipients) {
        io.to(data.recipients).emit('receive_message', data)
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
