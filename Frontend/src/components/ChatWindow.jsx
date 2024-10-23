import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  sendMessage,
  fetchConversation,
  deleteMessage,
} from '../redux/actions/chatAction'
import useSocket from '../utils/webSocketConnection'

const ChatWindow = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [selectedMessageId, setSelectedMessageId] = useState(null)
  const { users, selectedUser, messages } = useSelector((state) => state.chat)
  const { user: loggedInUser } = useSelector((state) => state.auth)

  useEffect(() => {
    if (selectedUser && loggedInUser) {
      dispatch(fetchConversation(loggedInUser, selectedUser))
    }
  }, [loggedInUser, selectedUser, dispatch])

  // Listen for real-time messages via Socket.IO

  // Initialize socket connection with user ID
  const { emit } = useSocket('http://localhost:3000', loggedInUser._id)

  const handleSendMessage = () => {
    if (message.trim() && selectedUser?._id && loggedInUser?._id) {
      const msg = {
        content: message,
        sender: loggedInUser._id,
        recipients: selectedUser._id,
        group: null,
        timestamp: new Date().toISOString(),
      }
      // Emit message to the socket server
      emit('send_message', msg)

      // Optionally, dispatch sendMessage if you want to store sent message locally
      dispatch(sendMessage(msg))

      setMessage('') // Clear input
    }
  }
  const handleMessageClick = (messageId) => {
    // Toggle selected message
    setSelectedMessageId((prevId) => (prevId === messageId ? null : messageId))
  }
  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await dispatch(deleteMessage(messageId, loggedInUser._id))
      } catch (error) {
        console.error('Failed to delete message:', error)
      }
    }
  }
  return (
    <div className='chatWindow'>
      <h3>Chat with {selectedUser?.username}</h3>
      <div className='messages'>
        {messages.length === 0 && <p>No messages yet</p>}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === loggedInUser._id ? 'from-me' : 'from-others'
            }
            onClick={() => handleMessageClick(msg._id)}
          >
            <strong>
              {msg.sender === loggedInUser._id ? 'Me' : selectedUser.username}:
            </strong>
            <span className='message-content'>{msg.content}</span>
            <span className='timestamp'>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
            {selectedMessageId === msg._id &&
              msg.sender === loggedInUser._id && ( // Show delete button only for user's messages
                <button
                  className='delete-button'
                  onClick={() => handleDeleteMessage(msg._id)} // Call delete function
                >
                  Delete
                </button>
              )}
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
    </div>
  )
}

export default ChatWindow
