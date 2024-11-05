import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  sendMessage,
  fetchConversation,
  deleteMessage,
} from '../redux/actions/chatAction'
import useSocket from '../utils/webSocketConnection'
import {
  fetchGroupConversation,
  sendGroupMessage,
} from '../redux/actions/groupChatAction'

const ChatWindow = () => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [selectedMessageId, setSelectedMessageId] = useState(null)
  const {
    users,
    selectedUser,
    messages: userMessages,
  } = useSelector((state) => state.chat)
  const {
    groups,
    selectedGroup,
    messages: groupMessages,
  } = useSelector((state) => state.group)
  const { user: loggedInUser } = useSelector((state) => state.auth)

  const messages = selectedUser ? userMessages : groupMessages

  useEffect(() => {
    if (selectedUser && loggedInUser) {
      dispatch(fetchConversation(loggedInUser, selectedUser))
    } else if (selectedGroup && loggedInUser) {
      dispatch(fetchGroupConversation(selectedGroup._id))
    }
  }, [loggedInUser, selectedUser, selectedGroup, dispatch])

  const { emit } = useSocket('http://localhost:3000', loggedInUser._id)

  const handleSendMessage = () => {
    if (message.trim() && loggedInUser?._id) {
      const msg = {
        content: message,
        sender: loggedInUser._id,
        timestamp: new Date().toISOString(),
      }

      if (selectedUser) {
        msg.recipients = selectedUser._id
        msg.group = null
        emit('send_message', msg)
        dispatch(sendMessage(msg))
      } else if (selectedGroup) {
        msg.group = selectedGroup._id
        msg.recipients = null
        emit('send_group_message', msg)
        dispatch(sendGroupMessage(msg))
      }

      setMessage('')
    }
  }

  const handleMessageClick = (messageId) => {
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

  const getSenderName = (msg) => {
    if (msg.sender === loggedInUser._id) {
      return 'Me'
    } else if (selectedGroup) {
      // Find the user by their ID from a separate users array if available
      const sender = users.find((user) => user._id === msg.sender)
      return sender ? sender.username : 'Unknown User'
    } else {
      return selectedUser?.username || 'Unknown User'
    }
  }

  return (
    <div className='chatWindow'>
      <h4>
        Chat with{' '}
        {selectedUser
          ? selectedUser.username
          : selectedGroup
          ? selectedGroup.name
          : ''}
      </h4>
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
            <strong>{getSenderName(msg)}:</strong>
            <span className='message-content'>{msg.content}</span>
            <span className='timestamp'>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
            {selectedMessageId === msg._id &&
              msg.sender === loggedInUser._id && (
                <button
                  className='delete-button'
                  onClick={() => handleDeleteMessage(msg._id)}
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
