import axios from 'axios'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAIL = 'REGISTER_FAIL'
const LOGOUT = 'LOGOUT'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})
const login = (details) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', details, {})
    console.log(data)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    dispatch({ type: LOGIN_SUCCESS, payload: data.user })
  } catch (error) {
    console.error('Error response:', error.response) // Log the full error response
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response ? error.response.data.message : 'Unknown error',
    })
  }
}

const register = (details) => async (dispatch) => {
  try {
    console.log('Register details:', details)
    const response = await axiosInstance.post('/auth/register', details)
    dispatch({ type: REGISTER_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response ? error.response.data.message : 'Unknown error',
    })
  }
}

const logout = () => async (dispatch) => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  dispatch({ type: LOGOUT })
}

export { login, logout, register }
