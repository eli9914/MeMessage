import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { receiveMessage } from '../redux/actions/chatAction'

const useSocket = (url, userId) => {
  const [socket, setSocket] = useState(null) // Use state to store the socket instance
  const dispatch = useDispatch()

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io(url)

    // Set the socket to state
    setSocket(newSocket)

    // Handle connection event
    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id)
      if (userId) {
        newSocket.emit('join', userId)
        console.log(`${userId} has joined their room`)
      }
    })

    // Handle disconnection
    newSocket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    // Handle receiving a message
    newSocket.on('receive_message', (msg) => {
      if (msg && msg.content && msg.content.trim() !== '') {
        dispatch(receiveMessage(msg)) // Dispatch received message to Redux store
      }
    })

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect() // Disconnect the socket when the component unmounts
    }
  }, [url, userId, dispatch])

  // Emit function to send messages
  const emit = (event, data) => {
    if (socket) {
      socket.emit(event, data)
    }
  }

  return { socket, emit }
}

export default useSocket
