const initialState = {
  users: [],
  selectedUser: null,
  messages: [],
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
      return {
        ...state,
        messages: [...state.messages, action.payload], // Append new message
      }
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] }

    default:
      return state
  }
}
export default chatReducer
