const express = require('express')
const UserService = require('../Services/UserService')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await UserService.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const status = await UserService.createUser(req.body)
    res.status(201).json(status)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
