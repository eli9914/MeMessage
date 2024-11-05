import axios from 'axios'

//Using in UserSideBar.jsx
const FETCH_USERS = 'FETCH_USERS'
const SET_SELECTED_USER = 'SET_SELECTED_USER'

//Using in ChatWindow.jsx
const FETCH_CONVERSATION = 'FETCH_CONVERSATION'
const SEND_MESSAGE = 'SEND_MESSAGE'
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
const DELETE_MESSAGE = 'DELETE_MESSAGE'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})

//Using in UserSideBar.jsx
const fetchUsers = (loggedInUserId) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get('/users')
    const users = data.filter((user) => user._id !== loggedInUserId)
    dispatch({ type: FETCH_USERS, payload: users })
  } catch (error) {
    console.error('Error response:', error.response)
  }
}

const setSelectedUser = (user) => ({
  type: SET_SELECTED_USER,
  payload: user,
})

//using in ChatWindow.jsx
const fetchConversation = (loggedInUser, selectedUser) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(
      `/messages/conversation/${loggedInUser._id}/${selectedUser._id}`
    )
    const conversation = await response.data
    dispatch({ type: FETCH_CONVERSATION, payload: conversation })
  } catch (error) {
    console.error('Failed to fetch conversation:', error)
  }
}

const sendMessage = (message) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/messages/send', message)
    dispatch({ type: SEND_MESSAGE, payload: response.data })
  } catch (error) {
    console.error('Error sending message:', error.response || error.message)
  }
}

const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  payload: message,
})
const deleteMessage = (messageId, userId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/messages/${messageId}`, {
      data: { userId },
    })
    dispatch({ type: DELETE_MESSAGE, payload: messageId })
  } catch (error) {
    console.error('Error deleting message:', error.response || error.message)
  }
}

export {
  fetchUsers,
  setSelectedUser,
  fetchConversation,
  sendMessage,
  receiveMessage,
  deleteMessage,
}
