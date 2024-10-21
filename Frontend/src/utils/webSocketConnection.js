import io from 'socket.io-client'
import { useEffect, useRef } from 'react'

const useSocket = (url, userId, eventHandlers = []) => {
  const socketRef = useRef(null) // Use a ref to keep the socket instance across renders

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(url)

      // Handle connection events
      socketRef.current.on('connect', () => {
        console.log('Socket connected:', socketRef.current.id)
        if (userId) {
          socketRef.current.emit('join', userId)
          console.log(`${userId} has joined their room`) // Log join event
        }
      })

      socketRef.current.on('connect_error', (err) => {
        console.error('Connection error:', err.message)
      })

      socketRef.current.on('disconnect', () => {
        console.log('Socket disconnected')
      })

      // Register event listeners if any
      eventHandlers.forEach(({ event, handler }) => {
        socketRef.current.on(event, handler)
      })
    }

    return () => {
      // Cleanup all event listeners
      eventHandlers.forEach(({ event, handler }) => {
        socketRef.current.off(event, handler)
      })
      // Optional: Disconnect if you want to close the socket when the component unmounts
      // socketRef.current.disconnect();
    }
  }, [url, eventHandlers])
  // Emit function to emit socket events
  const emit = (event, data) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data)
    }
  }
  return { socket: socketRef.current, emit } // Return the socket instance if needed
}

export default useSocket
