import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, setSelectedUser } from '../redux/actions/chatAction'
import { setSelectedGroup } from '../redux/actions/groupChatAction'

const UserSideBar = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.chat.users)
  const { user: loggedInUser } = useSelector((state) => state.auth) //this is the logged in user
  if (!loggedInUser) {
    return <div>Loading...</div>
  }
  useEffect(() => {
    dispatch(fetchUsers(loggedInUser._id))
  }, [loggedInUser, dispatch])

  return (
    <div className='user-sidebar'>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li
            key={user._id}
            onClick={() => {
              dispatch(setSelectedUser(user)) // Deselect any selected user
              dispatch(setSelectedGroup(null)) // Set the selected group
            }}
          >
            <img
              className='profile-picture'
              src={user.profilePicture}
              alt='Profile'
            />
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default UserSideBar
