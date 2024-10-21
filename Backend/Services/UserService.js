const userModel = require('../Models/UserModel')

const getAllUsers = async () => {
  return await userModel.find({})
}

const getUserById = async (id) => {
  return await userModel.findById(id)
}

const getUserByUsername = async (username) => {
  return await userModel.findOne({ username })
}

const createUser = async (user) => {
  const newUser = new userModel(user)
  await newUser.save()
  return 'User created successfully'
}

module.exports = { getAllUsers, getUserByUsername, getUserById, createUser }
