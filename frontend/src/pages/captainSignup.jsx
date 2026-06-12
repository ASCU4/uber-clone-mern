import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContextInstance.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
 
const CaptainSignup =() => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { setCaptain } = useContext(CaptainDataContext) ?? {}


  const submitHandler = async(e) => {
    e.preventDefault()
    const captainData = {  
    fullname: {
      firstname: firstName.trim(),
      lastname: lastName.trim()
    },
    email: email.trim().toLowerCase(),
    password: password,

    vehicle: {
      color: vehicleColor.trim(),
      plate: vehiclePlate.trim(),
      capacity: Number(vehicleCapacity),
      vehicleType: vehicleType
    }
}  

    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:4000'

    try {
      const response = await axios.post(`${baseUrl}/api/captains/register`, captainData)
     
      if(response.status === 201){
        const data = response.data
        if (typeof setCaptain === 'function') setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      } 
    } catch (err) {
      const apiPayload = err?.response?.data
      const apiErrorMsg = apiPayload?.errors?.[0]?.msg || apiPayload?.message
      console.error('captain signup failed', apiPayload || err)
      alert(apiErrorMsg || 'Captain signup failed')
    } finally {
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }
  }


  return (
   <div className='py-5 px-5 min-h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="/uber-driver.png" alt="uber-driver" />

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
           
            <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>


          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-base'>
            Create Captain Account
          </button>

          <p className='text-center'>
            Alreday have a account?{' '}
            <Link to='/captain-login' className='text-blue-600'>Login here </Link>
          </p>
        </form>
      </div>

      <div>
     <p className='text-[6px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.</p>
      </div>
    </div>
  )
}

export default CaptainSignup
