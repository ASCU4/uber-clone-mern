import React, { useState } from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserContextInstance'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  
  const navigate = useNavigate()

  const { setUser } = React.useContext(UserContext) ?? {}

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
      },
      email: email.trim().toLowerCase(),
      password,
    }

    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:4000'

    try {
      if (newUser.fullname.firstname.length < 3) {
        throw new Error('First name must be at least 3 characters')
      }
      if (!newUser.email.includes('@')) {
        throw new Error('Please enter a valid email')
      }
      if (newUser.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      const { data } = await axios.post(`${baseUrl}/api/users/register`, newUser)
      if (data?.token) localStorage.setItem('token', data.token)
      if (typeof setUser === 'function') setUser(data.user)
      navigate('/home')
    } catch (err) {
      const apiPayload = err?.response?.data
      const apiErrorMsg = apiPayload?.errors?.[0]?.msg || apiPayload?.message
      const localErrorMsg = err?.message
      console.error('register failed', apiPayload || err)
      alert(apiErrorMsg || localErrorMsg || 'Signup failed')
    } finally {
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
    }
  }

  return (
 <div>
   <div className='p-7 min-h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="/Uber.svg.png" alt="uber" />

        <form onSubmit={submitHandler}>

        <h3 className="text-w-1/2 font-medium mb-2">What's your name</h3>
           <div className=' flex gap-4 mb-6'>
                <input
            required
            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
            type="text"
            placeholder='Firstname'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
           <input
            
            className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base'
            type="text"
            placeholder='Lastname'
            value={lastName}
              onChange={(e)=> {
                setLastName(e.target.value)
                }}
          />
           </div>

          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
              onChange={(e)=> {
                setEmail(e.target.value)
                }}
            className='bg-[#eeeeee]  mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='Email@example.com'
          />

          <h3 className="text-xl mb-2">Enter your Password</h3>
          <input
            required
             value={password}
              onChange={(e)=> {
                setPassword(e.target.value)
                }}
            className='bg-[#eeeeee] mb-10 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder="Password"
          />

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-base'>
            Sign up
          </button>

          <p className='text-center'>
            Alreday have a account?{' '}
            <Link to='/login' className='text-blue-600'>Login here </Link>
          </p>
        </form>
      </div>

      <div>
     <p classname='text-[6px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.  </p>
      </div>
    </div>
  </div>
  )
}

export default UserSignup
