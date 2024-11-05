import { combineReducers } from 'redux'
import authReducer from './authReducer'
import chatReducer from './chatReducer'
import groupReducer from './groupReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  group: groupReducer,
})

export default rootReducer
