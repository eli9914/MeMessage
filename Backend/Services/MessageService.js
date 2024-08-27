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

const getMessageByUserId = async (userId) => {
  const messages = await MessageModel.find({
    $or: [{ sender: userId }, { receiver: userId }],
  }).sort({ createdAt: -1 })
  return messages
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
  if (message.recipients && message.recipients.length > 0) {
    message.recipients.forEach((recipient) => {
      io.to(recipient).emit('message', newMessage)
    })
  }

  return 'Message sent successfully'
}

module.exports = {
  createMessage,
  getMessageById,
  getMessageByUserId,
  getMessageByGroupId,
  sendMessage,
}
