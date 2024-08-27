const express = require('express')
const router = express.Router()

const MessageService = require('../Services/MessageService')

router.post('/send', async (req, res) => {
  try {
    console.log('Message Controller called')
    const status = await MessageService.sendMessage(req.body, req.io)
    res.status(200).send(status)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/User/:userId', async (req, res) => {
  try {
    const messages = await MessageService.getMessageByUserId(req.params.userId)
    res.status(200).send(messages)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/group/:groupId', async (req, res) => {
  try {
    const messages = await MessageService.getMessageByGroupId(
      req.params.groupId
    )
    res.status(200).send(messages)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
module.exports = router
