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
      return { ...state, selectedUser: action.payload }

    case 'SEND_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }

    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.filter(
            (msg) =>
              msg.content &&
              !state.messages.some((existingMsg) => existingMsg._id === msg._id)
          ),
        ], // Append new messages
      }
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] }

    default:
      return state
  }
}
export default chatReducer
