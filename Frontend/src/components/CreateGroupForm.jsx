import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGroup } from '../redux/actions/groupChatAction'

const CreateGroupForm = ({ users, loggedInUser }) => {
  const [groupName, setGroupName] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  const dispatch = useDispatch()

  const toggleMemberSelection = (userId) => {
    setSelectedMembers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        // Remove user if already selected
        return prevSelected.filter((id) => id !== userId)
      } else {
        // Add user if not selected
        return [...prevSelected, userId]
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const admin = loggedInUser._id // Set admin to the logged-in user
    // Ensure admin is included in the group members
    const updatedMembers = [...selectedMembers, admin]
    dispatch(createGroup({ name: groupName, members: updatedMembers, admin }))
    setGroupName('')
    setSelectedMembers([])
  }

  return (
    <div>
      <h2>Add Group</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder='Group Name'
          required
        />

        <div>
          <h3>Select Members</h3>
          <div className='dropdown'>
            {users
              .filter((user) => user._id !== loggedInUser._id) // Exclude the logged-in user
              .map((user) => (
                <div key={user._id}>
                  <label>
                    <input
                      type='checkbox'
                      checked={selectedMembers.includes(user._id)}
                      onChange={() => toggleMemberSelection(user._id)}
                    />
                    {user.username}
                  </label>
                </div>
              ))}
          </div>
        </div>

        <button type='submit'>Create Group</button>
      </form>
    </div>
  )
}

export default CreateGroupForm
