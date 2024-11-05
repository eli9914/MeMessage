import React from 'react'
import ChatWindow from './ChatWindow'
import '../Chat.css'
import { logout } from '../redux/actions/authAction'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SidebarContainer from './SideBarContainer'

const Chat = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user: loggedInUser } = useSelector((state) => state.auth)
  const users = useSelector((state) => state.chat.users)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className='chat-container' style={{ display: 'flex' }}>
      <div className='header'>
        <img src={loggedInUser.profilePicture} alt='Profile' />
        <span>Hello {loggedInUser?.username}</span>
        <button className='logout-button' onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className='chat-content'>
        <SidebarContainer users={users} loggedInUser={loggedInUser} />
        <ChatWindow loggedInUser={loggedInUser} />
      </div>
    </div>
  )
}

export default Chat
