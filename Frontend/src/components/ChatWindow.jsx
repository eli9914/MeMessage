import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { receiveMessage } from '../redux/actions/chatAction'

const socket = io('http://localhost:3000')

const ChatWindow = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const { selectedUser, messages } = useSelector((state) => state.chat)
  const { user: loggedInUser } = useSelector((state) => state.auth)

  useEffect(() => {
    //Listen for messages
    socket.on('recieve_message', (msg) => {
      dispatch(receiveMessage(msg))
    })
    return () => socket.off('recieve_message')
  }, [dispatch])

  const handleSendMessage = () => {
    if (message && selectedUser) {
      const msg = {
        message,
        from: loggedInUser._id,
        to: selectedUser._id,
      }
      socket.emit('send_message', msg)
      setMessage('')
    }
  }
  return (
    <div className='chatWindow'>
      <h3>Chat with {selectedUser?.username}</h3>
      <div className='messages'>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>
              {msg.from === loggedInUser._id ? 'Me' : selectedUser.username}:
            </strong>
            {msg.message}
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
