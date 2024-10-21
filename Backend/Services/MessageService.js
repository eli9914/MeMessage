const MessageModel = require('../Models/MessageModel')

const createMessage = async (message) => {
  const newMessage = new MessageModel(message)
  await newMessage.save()
  return newMessage
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
// Fetch conversation between two users
const getConversationBetweenUsers = async (userId1, userId2) => {
  return await MessageModel.find({
    $or: [
      { sender: userId1, recipients: userId2 },
      { sender: userId2, recipients: userId1 },
    ],
  }).sort({ timestamp: 1 }) // Sort messages by timestamp (optional)
}

const getMessageByGroupId = async (groupId) => {
  const messages = await MessageModel.find({
    groupId: groupId,
  }).sort({ createdAt: -1 })
  return messages
}

const sendMessage = async (message) => {
  const newMessage = await createMessage(message)
  return newMessage
}

module.exports = {
  createMessage,
  getMessageById,
  getMessageByUserId,
  getMessageByGroupId,
  getConversationBetweenUsers,
  sendMessage,
}
