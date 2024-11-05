const express = require('express')
const router = express.Router()

const MessageService = require('../Services/MessageService')

router.post('/send', async (req, res) => {
  try {
    const message = await MessageService.sendMessage(req.body, req.io)
    res.status(200).json(message)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Get messages for a specific user by their ID
router.get('/User/:userId', async (req, res) => {
  try {
    const messages = await MessageService.getMessageByUserId(req.params.userId)
    res.status(200).send(messages)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Get messages between two users (loggedInUser and selectedUser)
router.get('/conversation/:userId1/:userId2', async (req, res) => {
  try {
    const { userId1, userId2 } = req.params
    const messages = await MessageService.getConversationBetweenUsers(
      userId1,
      userId2
    )
    res.status(200).send(messages)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Get messages for a specific group by group ID
router.get('/group/:groupId', async (req, res) => {
  try {
    const messages = await MessageService.getConversationByGroupId(
      req.params.groupId
    )
    res.status(200).send(messages)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
router.delete('/:messageId', async (req, res) => {
  try {
    const userId = req.body.userId
    const message = await MessageService.deleteMessage(
      req.params.messageId,
      userId
    )
    res.status(200).send(message)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
module.exports = router
