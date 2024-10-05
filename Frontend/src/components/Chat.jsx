import React from 'react'
import UserSideBar from './UserSideBar'
import ChatWindow from './ChatWindow'
import '../Chat.css'
import { persistor } from '../main'
import { logout } from '../redux/actions/authAction'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Chat = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user: loggedInUser } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    persistor.purge()
    navigate('/')
  }

  return (
    <div className='chat-container' style={{ display: 'flex' }}>
      <div className='header'>
        <img src={loggedInUser.profilePicture} alt='Profile' />
        <span>Hello {loggedInUser?.username}</span>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <UserSideBar />
      <ChatWindow />
    </div>
  )
}

export default Chat
