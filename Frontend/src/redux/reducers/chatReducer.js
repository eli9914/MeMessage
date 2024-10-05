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
    case 'RECEIVE_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    default:
      return state
  }
}
export default chatReducer
