import React from 'react'
import Login from './components/Login.jsx'
import Chat from './components/Chat.jsx'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Chat' element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
