const mongoose = require('mongoose')
const User = require('./Models/UserModel') // Adjust the path as needed
const Group = require('./Models/GroupModel') // Adjust the path as needed
const bcrypt = require('bcryptjs')
// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/MeMessege', {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Function to generate random users
const generateRandomUsers = async (numUsers) => {
  const users = []
  for (let i = 0; i < numUsers; i++) {
    // Manually hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(`password${i + 1}`, salt)

    users.push({
      username: `user${i + 1}`,
      password: hashedPassword, // Store the hashed password
      profilePicture: `http://example.com/profile${i + 1}.jpg`,
      groups: [],
    })
  }
  return User.insertMany(users)
}

// Function to generate random groups and assign users
const generateRandomGroups = async (numGroups, userIds) => {
  const groups = []

  for (let i = 0; i < numGroups; i++) {
    // Shuffle user IDs to randomly select members for the group
    const shuffledUserIds = userIds.sort(() => 0.5 - Math.random())
    const numMembers = Math.floor(Math.random() * (userIds.length - 1)) + 1
    const members = shuffledUserIds.slice(0, numMembers)

    // Randomly pick an admin from the members
    const admin = members[Math.floor(Math.random() * members.length)]

    const group = new Group({
      name: `group${i + 1}`,
      members: members,
      admin: admin,
    })

    await group.save()

    // Assign group to each member's `groups` field
    await User.updateMany(
      { _id: { $in: members } },
      { $push: { groups: group._id } }
    )

    groups.push(group)
  }

  return groups
}

// Main function to populate the database
const populateDatabase = async () => {
  try {
    // Generate users
    const users = await generateRandomUsers(5)
    console.log('Users created:', users)

    // Extract user IDs
    const userIds = users.map((user) => user._id)

    // Generate groups and assign users
    const groups = await generateRandomGroups(3, userIds)
    console.log('Groups created:', groups)

    mongoose.connection.close() // Close connection
  } catch (error) {
    console.error('Error populating database:', error)
    mongoose.connection.close() // Close connection on error
  }
}

populateDatabase()
