import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUsers,
  resetUnreadCount,
  setSelectedUser,
} from '../redux/actions/chatAction'
import { setSelectedGroup } from '../redux/actions/groupChatAction'

const UserSideBar = () => {
  const dispatch = useDispatch()
  const { users, unreadCounts, selectedUser } = useSelector(
    (state) => state.chat
  )
  const { user: loggedInUser } = useSelector((state) => state.auth) //this is the logged in user

  if (!loggedInUser) {
    return <div>Loading...</div>
  }
  useEffect(() => {
    dispatch(fetchUsers(loggedInUser._id))
  }, [loggedInUser, dispatch])

  const handleUserClick = (user) => {
    dispatch(setSelectedUser(user)) // Set selected user
    dispatch(setSelectedGroup(null)) // Deselect any selected group
    // Optionally reset unread count for this user
    dispatch(resetUnreadCount(user._id))
  }
  return (
    <div className='user-sidebar'>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            onClick={() => handleUserClick(user)}
            className={selectedUser?._id === user._id ? 'selected' : ''}
          >
            <img
              className='profile-picture'
              src={user.profilePicture}
              alt='Profile'
            />
            {user.username}
            {unreadCounts[user._id] > 0 && (
              <span className='unread-count'>{unreadCounts[user._id]}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default UserSideBar
