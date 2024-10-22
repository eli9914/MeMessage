import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions/authAction' // Assuming you have a register action
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [details, setDetails] = useState({
    username: '',
    password: '',
    profilePicture: '',
  })
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(register(details))
    alert('Registered successfully')
    navigate('/')
  }

  return (
    <div
      className='container'
      style={{
        backgroundColor: '#aa67e7',
        minHeight: '100vh',
        minWidth: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className='row justify-content-center'>
        <div className='col-md-3'>
          <br />
          <br />
          <h1 className='text-center' style={{ color: 'white' }}>
            Register Page
          </h1>
          <br />
          <br />
          <form
            onSubmit={handleSubmit}
            className='p-5 border rounded shadow-sm'
            style={{ backgroundColor: 'white' }}
          >
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                className='form-control'
                placeholder='Username'
                id='username'
                value={details.username}
                onChange={(e) =>
                  setDetails({ ...details, username: e.target.value })
                }
                style={{ width: '100%' }} // Ensure width is 100%
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                id='password'
                value={details.password}
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                style={{ width: '100%' }} // Ensure width is 100%
              />
            </div>
            <div className='form-group'>
              <label htmlFor='profilePicture'>Profile Picture</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter URL of profile picture'
                id='profilePicture'
                value={details.profilePicture}
                onChange={(e) =>
                  setDetails({ ...details, profilePicture: e.target.value })
                }
                style={{ width: '100%' }} // Ensure width is 100%
              />
            </div>
            <button type='submit' className='btn btn-primary btn-block'>
              Register
            </button>
            <br />
          </form>
          {error && (
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Register
