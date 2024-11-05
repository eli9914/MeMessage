import React, { useState } from 'react'
import UserSideBar from './UserSideBar'
import GroupSideBar from './GroupSideBar'
import CreateGroupForm from './CreateGroupForm'
import '../Sidebar.css'

const SidebarContainer = ({ users, loggedInUser }) => {
  const [isCreateGroupVisible, setIsCreateGroupVisible] = useState(false)

  const toggleCreateGroupForm = () => {
    setIsCreateGroupVisible((prevState) => !prevState)
  }

  return (
    <div className='sidebar-container'>
      <UserSideBar />
      <GroupSideBar />
      <button onClick={toggleCreateGroupForm}>
        {isCreateGroupVisible ? '-' : '+'}
      </button>
      {isCreateGroupVisible && (
        <CreateGroupForm users={users} loggedInUser={loggedInUser} />
      )}
    </div>
  )
}

export default SidebarContainer
