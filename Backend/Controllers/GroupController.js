const express = require('express')
const router = express.Router()

const GroupService = require('../Services/GroupService')

router.get('/', async (req, res) => {
  try {
    const groups = await GroupService.getAllGroups()
    res.status(200).send(groups)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const groups = await GroupService.getGroupsByUserId(req.params.userId)
    res.status(200).send(groups)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
router.post('/create', async (req, res) => {
  try {
    const status = await GroupService.createGroup(req.body)
    res.status(200).send(status)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/addUser', async (req, res) => {
  try {
    const groupId = req.body.groupId
    const AdminId = req.body.AdminId
    const userId = req.body.userId
    const status = await GroupService.addUserToGroup(groupId, AdminId, userId)
    res.status(200).send(status)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/removeUser', async (req, res) => {
  try {
    const groupId = req.body.groupId
    const AdminId = req.body.AdminId
    const userId = req.body.userId
    const status = await GroupService.removeUserFromGroup(
      groupId,
      AdminId,
      userId
    )
    res.status(200).send(status)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.delete('/:groupId', async (req, res) => {
  try {
    const AdminId = req.body.AdminId
    const status = await GroupService.deleteGroup(req.params.groupId, AdminId)
    res.status(200).send(status)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
module.exports = router
