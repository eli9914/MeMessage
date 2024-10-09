const MessageModel = require('../Models/MessageModel')

const createMessage = async (message) => {
  const newMessage = new MessageModel(message)
  await newMessage.save()
  return 'Message created successfully'
}

const getMessageById = async (id) => {
  const message = await MessageModel.findById(id)
  return message
}

// MessageService.js
const getMessageByUserId = async (userId) => {
  return await MessageModel.find({
    $or: [
      { sender: userId }, // Messages sent by the user
      { recipients: userId }, // Messages received by the user
    ],
  })
    .populate('sender')
    .populate('recipients') // Populate sender and recipients if needed
}

const getMessageByGroupId = async (groupId) => {
  const messages = await MessageModel.find({
    groupId: groupId,
  }).sort({ createdAt: -1 })
  return messages
}

const sendMessage = async (message, io) => {
  console.log('Message Service called')
  const newMessage = await createMessage(message)
  if (message.recipients) {
    io.to(message.recipients).emit('receive_message', newMessage)
  }

  return message.content
}

module.exports = {
  createMessage,
  getMessageById,
  getMessageByUserId,
  getMessageByGroupId,
  sendMessage,
}
