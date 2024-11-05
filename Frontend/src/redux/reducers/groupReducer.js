const initialState = {
  groups: [],
  selectedGroup: null,
  messages: [],
}

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_GROUPS':
      return { ...state, groups: action.payload }
    case 'SET_SELECTED_GROUP':
      return { ...state, selectedGroup: action.payload, messages: [] }

    case 'FETCH_GROUP_CONVERSATION':
      return { ...state, messages: action.payload }

    case 'CREATE_GROUP':
      return { ...state, groups: [...state.groups, action.payload] }
    case 'SEND_GROUP_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }

    case 'RECEIVE_GROUP_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload], // Append new message
      }
    case 'DELETE_GROUP_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter((msg) => msg._id !== action.payload),
      }

    default:
      return state
  }
}

export default groupReducer
