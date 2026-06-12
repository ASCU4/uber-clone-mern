import React, { useState } from 'react'

const ConfirmRidePopUp = ({
  setConfirmRidePopupPanel,
  returnToRidePopup,
}) => {
  const [enteredOtp, setEnteredOtp] = useState('')
  const [verificationStatus, setVerificationStatus] = useState('')

  const verifyOtp = (event) => {
    event.preventDefault()

    const rideOtp = localStorage.getItem('rideOtp')

    if (!rideOtp) {
      setVerificationStatus('missing')
      return
    }

    if (enteredOtp === rideOtp) {
      setVerificationStatus('success')
      localStorage.removeItem('rideOtp')
      setTimeout(() => {
        returnToRidePopup()
      }, 400)
      return
    }

    setVerificationStatus('error')
  }

  return (
    <div>
      <button
        type='button'
        onClick={() => setConfirmRidePopupPanel(false)}
        className='absolute top-1 w-[93%] p-1 text-center'
        aria-label='Close confirmation panel'
      >
        <i className='ri-arrow-down-wide-line text-3xl text-gray-300'></i>
      </button>

      <h3 className='mb-5 text-2xl font-semibold'>Confirm Ride</h3>

      <div className='rounded-lg bg-yellow-400 p-4'>
        <h4 className='text-lg font-semibold'>Ride details</h4>
        <p className='mt-1 text-sm'>Enter the four-digit OTP from the rider.</p>
      </div>

      <form onSubmit={verifyOtp}>
        <input
          type='text'
          inputMode='numeric'
          maxLength={4}
          value={enteredOtp}
          onChange={(event) => {
            setEnteredOtp(event.target.value.replace(/\D/g, '').slice(0, 4))
            setVerificationStatus('')
          }}
          placeholder='Enter 4-digit OTP'
          className='mt-5 w-full rounded-lg border border-gray-300 p-3 text-center text-xl tracking-widest outline-none focus:border-black'
          aria-label='Ride OTP'
        />

        {verificationStatus === 'success' && (
          <p className='mt-2 text-sm font-semibold text-green-600'>
            OTP verified. Ride can now start.
          </p>
        )}
        {verificationStatus === 'error' && (
          <p className='mt-2 text-sm font-semibold text-red-600'>
            Incorrect OTP. Ask the rider to check the number.
          </p>
        )}
        {verificationStatus === 'missing' && (
          <p className='mt-2 text-sm font-semibold text-red-600'>
            No active ride OTP was found.
          </p>
        )}

        <button
          type='submit'
          disabled={enteredOtp.length !== 4 || verificationStatus === 'success'}
          className='mt-5 w-full rounded-lg bg-green-600 p-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400'
        >
          {verificationStatus === 'success' ? 'Ride Verified' : 'Confirm Ride'}
        </button>
      </form>

      <button
        type='button'
        onClick={returnToRidePopup}
        className='mt-2 w-full rounded-lg bg-gray-300 p-3 font-semibold text-gray-700'
      >
        Go Back
      </button>
    </div>
  )
}

export default ConfirmRidePopUp
