import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUserGroups,
  setSelectedGroup,
} from '../redux/actions/groupChatAction'
import { setSelectedUser } from '../redux/actions/chatAction'

const GroupSideBar = () => {
  const dispatch = useDispatch()
  const groups = useSelector((state) => state.group.groups)
  const { user: loggedInUser } = useSelector((state) => state.auth)
  const error = useSelector((state) => state.group.error) // Assuming you handle errors in your Redux store

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchUserGroups(loggedInUser._id))
    }
  }, [loggedInUser, dispatch])

  if (!loggedInUser) {
    return <div>Loading...</div>
  }

  return (
    <div className='group-sidebar'>
      <h3>Groups</h3>
      {error && (
        <p className='error-message'>Failed to load groups: {error}</p>
      )}{' '}
      {/* Display an error message */}
      <ul>
        {Array.isArray(groups) && groups.length > 0 ? (
          groups.map((group) => (
            <li
              key={group._id}
              onClick={() => {
                dispatch(setSelectedUser(null)) // Deselect any selected user
                dispatch(setSelectedGroup(group)) // Set the selected group
              }}
            >
              {group.name}
            </li>
          ))
        ) : (
          <li>No groups available</li> // Display a message if there are no groups
        )}
      </ul>
    </div>
  )
}

export default GroupSideBar
