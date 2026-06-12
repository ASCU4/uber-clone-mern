import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = ({
  setConfirmRidePopupPanel,
  returnToRidePopup,
}) => {
  const navigate = useNavigate()
  const [enteredOtp, setEnteredOtp] = useState('')
  const [verificationStatus, setVerificationStatus] = useState('')
  const storedRide = localStorage.getItem('activeRide')
  let activeRide = null

  try {
    activeRide = storedRide ? JSON.parse(storedRide) : null
  } catch {
    activeRide = null
  }

  const rideDetails = (() => {
    const base =
      activeRide && activeRide.pickup
        ? activeRide
        : {
            pickup: {
              title: '562/11-A',
              address: 'Hamirpur, Himachal Pradesh 177001',
            },
            destination: {
              title: '555/12-D',
              address: 'Dharamshala, Himachal Pradesh 177008',
            },
            distance: '4.2 KM',
            vehicle: {
              fare: 'Rs. 157.21',
            },
            paymentMethod: 'Cash/Online',
          }

    return {
      ...base,
      // normalize fields expected by UI
      user: base.user, // may be undefined if your activeRide doesn't include it
      fare: base.fare ?? base.vehicle?.fare,
      _id: base._id,
    }
  })()

  const verifyOtp = (event) => {
    event.preventDefault()

    if (enteredOtp.length !== 4) {
      setVerificationStatus('incomplete')
      return
    }

    const rideOtp = localStorage.getItem('rideOtp')

    if (!rideOtp) {
      setVerificationStatus('missing')
      return
    }

    if (enteredOtp !== rideOtp) {
      setVerificationStatus('error')
      return
    }

    sessionStorage.setItem('rideOtpVerified', 'true')
    localStorage.removeItem('rideOtp')
    setVerificationStatus('success')
    console.log('[OTP verified] rideDetails to navigate:', rideDetails)
    navigate('/captain-riding', { state: { ride: rideDetails } })
  }

  const handleOtpChange = (event) => {
    setEnteredOtp(event.target.value.replace(/\D/g, '').slice(0, 4))
    setVerificationStatus('')
  }

  const statusMessages = {
    incomplete: 'Enter the complete 4-digit OTP to start the ride.',
    error: 'That OTP is incorrect. Check the number with the rider.',
    missing: 'No active ride OTP was found. Return and accept a ride first.',
    success: 'OTP verified. Starting the ride...',
  }

  const hasError = ['incomplete', 'error', 'missing'].includes(
    verificationStatus,
  )

  return (
    <section className='mx-auto w-full max-w-lg rounded-t-3xl bg-white px-5 pb-6 pt-3 shadow-2xl'>
      <button
        type='button'
        onClick={() => setConfirmRidePopupPanel(false)}
        className='mx-auto flex h-8 w-16 items-center justify-center text-gray-400 transition hover:text-gray-700'
        aria-label='Close confirmation panel'
      >
        <span className='h-1.5 w-12 rounded-full bg-gray-300' />
      </button>

      <div className='mb-5'>
        <p className='text-sm font-semibold uppercase tracking-wider text-green-600'>
          Rider picked up
        </p>
        <h3 className='mt-1 text-2xl font-bold text-gray-900'>Confirm your ride</h3>
        <p className='mt-1 text-sm text-gray-500'>
          Ask the rider for the 4-digit OTP before starting.
        </p>
      </div>

      <div className='overflow-hidden rounded-2xl border border-gray-200 bg-gray-50'>
        <div className='flex gap-4 border-b border-gray-200 p-4'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg text-green-700'>
            <i className='ri-map-pin-user-fill' />
          </span>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>
              Pickup
            </p>
            <h4 className='font-semibold text-gray-900'>
              {rideDetails?.pickup?.title}
            </h4>
            <p className='text-sm text-gray-500'>
              {rideDetails?.pickup?.address}
            </p>
          </div>
        </div>

        <div className='flex gap-4 border-b border-gray-200 p-4'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-lg text-white'>
            <i className='ri-map-pin-2-fill' />
          </span>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>
              Destination
            </p>
            <h4 className='font-semibold text-gray-900'>
              {rideDetails?.destination?.title}
            </h4>
            <p className='text-sm text-gray-500'>
              {rideDetails?.destination?.address}
            </p>
          </div>
        </div>

        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center gap-4'>
            <span className='flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-lg text-yellow-700'>
              <i className='ri-cash-line' />
            </span>
            <div>
              <p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>
                Payment
              </p>
              <p className='font-medium text-gray-700'>
                {rideDetails?.paymentMethod}
              </p>
            </div>
          </div>
          <p className='text-xl font-bold text-gray-900'>
            {rideDetails?.vehicle?.fare}
          </p>
        </div>
      </div>

      <form className='mt-5' onSubmit={verifyOtp} noValidate>
        <label
          htmlFor='ride-otp'
          className='mb-2 block text-sm font-semibold text-gray-800'
        >
          Ride OTP
        </label>
        <input
          id='ride-otp'
          type='text'
          inputMode='numeric'
          autoComplete='one-time-code'
          maxLength={4}
          value={enteredOtp}
          onChange={handleOtpChange}
          placeholder='••••'
          className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-center text-2xl font-bold tracking-[0.6em] text-gray-900 outline-none transition placeholder:tracking-[0.6em] ${
            hasError
              ? 'border-red-400 focus:border-red-500'
              : 'border-gray-200 focus:border-green-600'
          }`}
          aria-describedby={verificationStatus ? 'otp-status' : undefined}
          aria-invalid={hasError}
          autoFocus
        />

        {verificationStatus && (
          <p
            id='otp-status'
            role='status'
            className={`mt-2 text-sm font-medium ${
              hasError ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {statusMessages[verificationStatus]}
          </p>
        )}

        <button
          type='submit'
          disabled={enteredOtp.length !== 4 || verificationStatus === 'success'}
          className='mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3.5 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500'
        >
          <span>
            {verificationStatus === 'success' ? 'Ride verified' : 'Confirm and start'}
          </span>
          <i className='ri-arrow-right-line text-lg' />
        </button>
      </form>

      <button
        type='button'
        onClick={returnToRidePopup}
        className='mt-3 w-full rounded-xl px-4 py-3 font-semibold text-gray-600 transition hover:bg-gray-100'
      >
        Go back
      </button>
    </section>
  )
}

export default ConfirmRidePopUp
