import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserContextInstance'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const { setUser } = useContext(UserContext) ?? {}
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = {
      email: email.trim().toLowerCase(),
      password,
    }

    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:4000'

    try {
      const { data } = await axios.post(`${baseUrl}/api/users/login`, userData)
      if (data?.token) localStorage.setItem('token', data.token)
      if (typeof setUser === 'function') setUser(data.user)
      navigate('/home')
    } catch (err) {
      console.error('login failed', err?.response?.data || err)
      alert(err?.response?.data?.message || 'Login failed')
    } finally {
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className='p-7 min-h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="/Uber.svg.png" alt="uber" />

        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='Email@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-xl mb-2">Enter your Password</h3>
          <input
            required
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
            Login
          </button>

          <p className='text-center'>
            New here?{' '}
            <Link to='/signup' className='text-blue-600'>Create new Account</Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to="/captain-login"
          className='flex items-center justify-center bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
