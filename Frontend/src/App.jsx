import React from 'react'
import Login from './components/Login.jsx'
import Chat from './components/Chat.jsx'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Chat' element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
