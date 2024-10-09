// ChatWindow.js
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import {
  fetchUsers,
  sendMessage,
  receiveMessage,
  clearMessages,
} from '../redux/actions/chatAction'

const socket = io('http://localhost:3000')

const ChatWindow = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const { users, selectedUser, messages } = useSelector((state) => state.chat)
  const { user: loggedInUser } = useSelector((state) => state.auth)

  // Fetch users on component load
  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchUsers(loggedInUser._id))
    }
  }, [dispatch, loggedInUser])

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser) {
      dispatch(receiveMessage(selectedUser._id)) // Fetch past messages for this user
    }
  }, [dispatch, selectedUser])

  // Listen for real-time messages via Socket.IO
  useEffect(() => {
    const handleReceiveMessage = (msg) => {
      if (msg && msg.content && msg.content.trim() !== '') {
        dispatch({ type: 'RECEIVE_MESSAGE', payload: msg }) // Add real-time message
      }
    }

    socket.on('receive_message', handleReceiveMessage)

    return () => {
      socket.off('receive_message', handleReceiveMessage)
    }
  }, [dispatch])

  // Handle sending a message
  const handleSendMessage = () => {
    if (message.trim() && selectedUser) {
      const msg = {
        content: message,
        sender: loggedInUser._id,
        recipients: [selectedUser._id],
        group: null,
        timestamp: new Date().toISOString(),
      }
      dispatch(sendMessage(msg)) // Send via Redux
      socket.emit('send_message', msg) // Emit to Socket.IO server
      setMessage('') // Clear input
    }
  }

  // Clear messages
  const handleClearMessages = () => {
    dispatch(clearMessages()) // Dispatch clear action
  }

  return (
    <div className='chatWindow'>
      <h3>Chat with {selectedUser?.username}</h3>
      <div className='messages'>
        {messages
          .filter(
            (msg) =>
              (msg.sender === loggedInUser._id &&
                msg.recipients.includes(selectedUser._id)) ||
              (msg.sender === selectedUser._id &&
                msg.recipients.includes(loggedInUser._id))
          )
          .map((msg) => (
            <div key={msg._id}>
              <strong>
                {msg.sender === loggedInUser._id ? 'Me' : selectedUser.username}
                :
              </strong>
              <span>{msg.content}</span>
              <span className='timestamp'>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
      </div>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type a message'
      />
      <button className='send-button' onClick={handleSendMessage}>
        Send
      </button>
      <button className='clear-button' onClick={handleClearMessages}>
        Clear Messages
      </button>
    </div>
  )
}

export default ChatWindow
