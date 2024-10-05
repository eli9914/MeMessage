import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, setSelectedUser } from '../redux/actions/chatAction'

const UserSideBar = () => {
  const dispath = useDispatch()
  const users = useSelector((state) => state.chat.users)
  const { user: loggedInUser } = useSelector((state) => state.auth) //this is the logged in user
  if (!loggedInUser) {
    return <div>Loading...</div>
  }
  useEffect(() => {
    dispath(fetchUsers(loggedInUser._id))
  }, [loggedInUser, dispath])

  return (
    <div className='user-sidebar'>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id} onClick={() => dispath(setSelectedUser(user))}>
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
