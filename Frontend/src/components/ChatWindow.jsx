import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  sendMessage,
  fetchConversation,
  receiveMessage,
} from '../redux/actions/chatAction'
import useSocket from '../utils/webSocketConnection'

const ChatWindow = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const { users, selectedUser, messages } = useSelector((state) => state.chat)
  const { user: loggedInUser } = useSelector((state) => state.auth)

  useEffect(() => {
    if (selectedUser && loggedInUser) {
      dispatch(fetchConversation(loggedInUser, selectedUser))
    }
  }, [loggedInUser, selectedUser, dispatch])

  // Listen for real-time messages via Socket.IO
  const { emit } = useSocket('http://localhost:3000', loggedInUser._id, [
    {
      event: 'receive_message',
      handler: (msg) => {
        console.log('Received message via socket:', msg)
        if (msg && msg.content && msg.content.trim() !== '') {
          dispatch(receiveMessage(msg)) // Dispatch received message to Redux
        }
      },
    },
  ])

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
  return (
    <div className='chatWindow'>
      <h3>Chat with {selectedUser?.username}</h3>
      <div className='messages'>
        {messages.length === 0 && <p>No messages yet</p>}
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={
              msg.sender === loggedInUser._id ? 'from-me' : 'from-others'
            }
          >
            <strong>
              {msg.sender === loggedInUser._id ? 'Me' : selectedUser.username}:
            </strong>
            <span className='message-content'>{msg.content}</span>
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
    </div>
  )
}

export default ChatWindow
