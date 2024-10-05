// build an redux action to fetch all users from the backend and store them in the redux store

import axios from 'axios'

const FETCH_USERS = 'FETCH_USERS'
const SET_SELECTED_USER = 'SET_SELECTED_USER'
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
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

const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  payload: message,
})

export { fetchUsers, setSelectedUser, receiveMessage }
