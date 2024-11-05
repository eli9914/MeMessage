import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})
//Using in GroupSideBar.jsx
const FETCH_USER_GROUPS = 'FETCH_USER_GROUPS'
const FETCH_GROUP_CONVERSATION = 'FETCH_GROUP_CONVERSATION'
const SEND_GROUP_MESSAGE = 'SEND_GROUP_MESSAGE'
const RECEIVE_GROUP_MESSAGE = 'RECEIVE_GROUP_MESSAGE'
const SET_SELECTED_GROUP = 'SET_SELECTED_GROUP'
const CREATE_GROUP = 'CREATE_GROUP'

const fetchUserGroups = (loggedInUserId) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get(`/groups/${loggedInUserId}`)
    dispatch({ type: FETCH_USER_GROUPS, payload: data })
  } catch (error) {
    console.error('Error response:', error.response)
  }
}

const fetchGroupConversation = (groupId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/messages/group/${groupId}`)
    const conversation = response.data
    dispatch({ type: FETCH_GROUP_CONVERSATION, payload: conversation })
  } catch (error) {
    console.error('Failed to fetch conversation:', error)
  }
}
const sendGroupMessage = (message) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/messages/send', message)
    dispatch({ type: SEND_GROUP_MESSAGE, payload: response.data })
  } catch (error) {
    console.error('Error sending message:', error.response || error.message)
  }
}
const setSelectedGroup = (group) => ({
  type: SET_SELECTED_GROUP,
  payload: group,
})
const receiveGroupMessage = (message) => ({
  type: RECEIVE_GROUP_MESSAGE,
  payload: message,
})

const createGroup =
  ({ name, members, admin }) =>
  async (dispatch) => {
    try {
      const { data } = await axiosInstance.post('/groups/create', {
        name,
        members,
        admin,
      })
      dispatch({ type: CREATE_GROUP, payload: data })
    } catch (error) {
      console.error('Error response:', error.response)
    }
  }

export {
  fetchUserGroups,
  fetchGroupConversation,
  sendGroupMessage,
  receiveGroupMessage,
  setSelectedGroup,
  createGroup,
}
