import React, { useEffect } from 'react'
import ChatWindow from './ChatWindow'
import '../Chat.css'
import { logout } from '../redux/actions/authAction'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SidebarContainer from './SideBarContainer'
import { jwtDecode } from 'jwt-decode' // Import correctly as a named import

const Chat = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user: loggedInUser } = useSelector((state) => state.auth)
  const users = useSelector((state) => state.chat.users)

  // Token check and logout logic
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      console.log('No token found')
      handleLogout() // Ensure logout function is called
      return // Early return after logout, still ensuring hooks are called
    }

    try {
      const decoded = jwtDecode(token) // Decode the token
      const currentTime = Date.now() / 1000

      // Check if token is expired
      if (decoded.exp < currentTime) {
        console.log('Token expired')
        window.alert('Session expired. Please login again')
        handleLogout() // Handle logout in case of token expiry
      }
    } catch (error) {
      console.error('Error decoding token:', error)
      handleLogout() // Handle logout in case of token decoding error
    }
  }, [dispatch, navigate]) // Dependencies should be the same on each render

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token') // Clear token on logout
    window.location.reload()
    navigate('/') // Redirect to login
  }

  return (
    <div className='chat-container' style={{ display: 'flex' }}>
      <div className='header'>
        <img src={loggedInUser?.profilePicture} alt='Profile' />
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
