import React from 'react'
import UserSideBar from './UserSideBar'
import ChatWindow from './ChatWindow'
import '../Chat.css'
import { logout } from '../redux/actions/authAction'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Chat = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user: loggedInUser } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className='chat-container' style={{ display: 'flex' }}>
      <div className='header'>
        <img src={loggedInUser.profilePicture} alt='Profile' />
        <span>Hello {loggedInUser?.username}</span>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <div className='chat-content'>
        <UserSideBar />
        <ChatWindow />
      </div>
    </div>
  )
}

export default Chat
