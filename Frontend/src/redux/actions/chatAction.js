import axios from 'axios'

const FETCH_USERS = 'FETCH_USERS'
const SET_SELECTED_USER = 'SET_SELECTED_USER'
const SEND_MESSAGE = 'SEND_MESSAGE'
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
const CLEAR_MESSAGES = 'CLEAR_MESSAGES'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})

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

const sendMessage = (message) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/messages/send', message)
    console.log('Message sent:', response.data)
    dispatch({ type: SEND_MESSAGE, payload: response.data })
  } catch (error) {
    console.error('Error sending message:', error.response || error.message)
  }
}

const receiveMessage = (userId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/messages/User/${userId}`)
    const messages = response.data
    dispatch({
      type: RECEIVE_MESSAGE,
      payload: messages.filter((msg) => msg.content), // Ensure only messages with content are included
    })
  } catch (error) {
    console.error('Error fetching messages:', error.response || error.message)
  }
}
const clearMessages = () => ({
  type: CLEAR_MESSAGES,
})

export {
  fetchUsers,
  setSelectedUser,
  sendMessage,
  receiveMessage,
  clearMessages,
}
