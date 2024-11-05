const GroupModel = require('../Models/GroupModel')

const getAllGroups = async () => {
  const groups = await GroupModel.find()
  return groups
}
const getGroupById = async (groupId) => {
  const group = await GroupModel.findById(groupId)
  return group
}

const getGroupsByUserId = async (userId) => {
  const groups = await GroupModel.find({
    $or: [{ admin: userId }, { members: userId }],
  })
  return groups
}
const createGroup = async (group) => {
  const newGroup = new GroupModel(group)
  await newGroup.save()
  return newGroup
}

const checkIfAdmin = async (groupId, userId) => {
  const group = await getGroupById(groupId)
  if (group.admin === userId) return true
  return false
}

const addUserToGroup = async (groupId, AdminId, userId) => {
  const group = await findGroupById(groupId)
  if (!group) return 'Group not found'
  if (group.admin !== AdminId) return 'User not authorized to add user to group'

  if (group.members.includes(userId)) return 'User already in group'

  if (!group.members.includes(userId)) group.members.push(userId)

  await group.save()

  return 'User added to group successfully'
}

const removeUserFromGroup = async (groupId, AdminId, userId) => {
  const group = await getGroupById(groupId)
  if (!group) return 'Group not found'
  if (group.admin !== AdminId)
    return 'User not authorized to remove user from group'

  if (!group.members.includes(userId)) return 'User not in group'

  group.members = group.members.filter((member) => member !== userId)

  await group.save()

  return 'User removed from group successfully'
}

const deleteGroup = async (groupId, AdminId) => {
  const group = await getGroupById(groupId)
  if (!group) return 'Group not found'
  if (group.admin.toString() !== AdminId.toString())
    return 'User not authorized to delete group'
  await GroupModel.findByIdAndDelete(groupId)
  return 'Group deleted successfully'
}

module.exports = {
  getAllGroups,
  getGroupById,
  getGroupsByUserId,
  createGroup,
  checkIfAdmin,
  addUserToGroup,
  removeUserFromGroup,
  deleteGroup,
}
