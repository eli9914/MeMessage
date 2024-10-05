const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const SECRET_KEY = 'messengerapp'

const userService = require('../Services/UserService')

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const User = await userService.getUserByUsername(username)
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' })
    }
    if (!User) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, User.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password' })
    }

    const token = jwt.sign(
      { userId: User._id, username: User.username },
      SECRET_KEY,
      { expiresIn: '3h' }
    )
    return res.status(200).json({ token, user: User })
  } catch (error) {
    console.error(error) // Log error for debugging
    return res.status(500).json({ message: 'Something went wrong', error })
  }
})

module.exports = router
