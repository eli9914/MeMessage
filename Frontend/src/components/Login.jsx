import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/authAction'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [details, setDetails] = useState({ username: '', password: '' })
  const user = useSelector((state) => state.auth.user)
  const error = useSelector((state) => state.auth.error)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(details))
  }

  useEffect(() => {
    if (user !== null) {
      navigate('/Chat')
    }
  }, [user])

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
            Login Page
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
            <button type='submit' className='btn btn-primary btn-block'>
              Login
            </button>
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

export default Login
