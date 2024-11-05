const MessageModel = require('../Models/MessageModel')

const createMessage = async (message) => {
  const { sender, recipients } = message
  await limitMessages(sender, recipients)
  const newMessage = new MessageModel(message)
  await newMessage.save()
  return newMessage
}

// Limit the number of messages in a conversation
const limitMessages = async (sender, recipients, messageLimit = 20) => {
  const conversationMessages = await getConversationBetweenUsers(
    sender,
    recipients
  )

  // If the total messages in the conversation exceed the limit, delete the oldest one(s)
  if (conversationMessages.length > messageLimit) {
    const excessMessages = conversationMessages.length - messageLimit + 1
    // Delete the oldest excess messages
    const oldestMessageIds = conversationMessages
      .slice(0, excessMessages)
      .map((message) => message._id)

    await MessageModel.deleteMany({ _id: { $in: oldestMessageIds } })
  }
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

// Fetch conversation of the group
const getConversationByGroupId = async (groupId) => {
  return await MessageModel.find({
    group: groupId,
  }).sort({ timestamp: 1 }) // Sort messages by timestamp (optional)
}

const sendMessage = async (message) => {
  const newMessage = await createMessage(message)
  return newMessage
}

const deleteMessage = async (messageId, userId) => {
  const message = await MessageModel.findById(messageId)
  if (!message) {
    throw new Error('Message not found')
  }
  console.log('sender', message.sender.toString())
  if (message.sender.toString() !== userId || !userId) {
    throw new Error('You are not authorized to delete this message')
  }
  await MessageModel.findByIdAndDelete(messageId)
  return 'Message deleted successfully'
}
module.exports = {
  createMessage,
  getMessageById,
  getMessageByUserId,
  getConversationByGroupId,
  getConversationBetweenUsers,
  sendMessage,
  deleteMessage,
}
