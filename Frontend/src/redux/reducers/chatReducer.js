const initialState = {
  users: [],
  selectedUser: null,
  messages: [],
  unreadCounts: {},
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return { ...state, users: action.payload }
    case 'SET_SELECTED_USER':
      return { ...state, selectedUser: action.payload, messages: [] }

    case 'FETCH_CONVERSATION':
      return { ...state, messages: action.payload }
    case 'SEND_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }

    case 'RECEIVE_MESSAGE':
      const { sender } = action.payload
      return {
        ...state,
        messages: [...state.messages, action.payload], // Append new message,
        unreadCounts: {
          ...state.unreadCounts,
          [sender]: (state.unreadCounts[sender] || 0) + 1,
        },
      }
    case 'RESET_UNREAD_COUNT':
      const { userId } = action.payload
      const newUnreadCounts = { ...state.unreadCounts }
      delete newUnreadCounts[userId]
      return { ...state, unreadCounts: newUnreadCounts }

    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter((msg) => msg._id !== action.payload),
      }

    default:
      return state
  }
}
export default chatReducer
