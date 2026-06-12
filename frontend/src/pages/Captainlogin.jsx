import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContextInstance.jsx'

const Captainlogin =() => {

  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
  const { setCaptain } = useContext(CaptainDataContext) ?? {}
  const navigate = useNavigate()

    const handleSubmit = async(e) => {
      e.preventDefault()
    const captainData ={
      email: email.trim().toLowerCase(),
      password
    }

    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:4000'

    try {
      const response = await axios.post(`${baseUrl}/api/captains/login`, captainData)
     
      if(response.status === 200){

        const data = response.data
        if (typeof setCaptain === 'function') setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
    } catch (err) {
      const apiPayload = err?.response?.data
      const apiErrorMsg = apiPayload?.errors?.[0]?.msg || apiPayload?.message
      console.error('captain login failed', apiPayload || err)
      alert(apiErrorMsg || 'Captain login failed')
    } finally {
      setEmail('')
      setPassword('')
    }
    }
  return (
     <div className='p-7 min-h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="/uber-driver.png" alt="uber" />

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
            Join a fleet?{' '}
            <Link to='/captain-signup' className='text-blue-600'>Register as a captain </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to="/login"
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg'>
          Sign in as User</Link>
      </div>
    </div>
  )
}

export default Captainlogin
