import React, { useEffect, useState } from 'react'

const WaitingForRide = (props) => {
  const [activeRide, setActiveRide] = useState(null)

  useEffect(() => {
    const read = () => {
      const value = localStorage.getItem('activeRide')
      console.log('[WaitingForRide] activeRide from localStorage:', value)
      setActiveRide(value)
    }

    // initial read
    read()

    // localStorage is not reactive; poll briefly so UI updates immediately after FinishRide clears it.
    const intervalId = setInterval(read, 250)

    return () => clearInterval(intervalId)
  }, [])

  if (!activeRide) {
    return (
      <div className='p-6 text-center'>
        <h2 className='text-2xl font-bold text-green-600'>
          Ride Completed ✅
        </h2>

        <p className='mt-3 text-gray-600'>
          Thank you for riding with us.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h5
        className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => {
          props.setWaitingRidePanel?.(false)
        }}
      >
        <i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i>
      </h5>

      <div className='flex items-center justify-between'>
        <img
          className='h-20 w-32 object-contain translate-x-4'
          src={props.selectedVehicle.image}
          alt={props.selectedVehicle.alt}
        />

        <div className='text-right'>
          <div className='inline-block rounded-md bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 mb-2'>
            4 min away
          </div>

          <h2 className='text-lg font-medium'>Aman Sharma</h2>

          <h4 className='text-xl font-bold mt-1 -mb-1'>
            HP67 AB 1234
          </h4>

          <p className='text-sm text-gray-600'>
            Maruti Suzuki Alto
          </p>

          <p className='mt-2 text-sm font-semibold text-gray-800'>
            OTP:
            <span className='text-lg tracking-widest'>
              {props.otp}
            </span>
          </p>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-3 p-3 border-b-2'>
            <i className='ri-map-pin-user-fill'></i>

            <div>
              <h3 className='text-lg font-medium'>565/12-D</h3>

              <p className='text-sm text-gray-600 font-medium'>
                Hamirpur, Himachal Pradesh 177001
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 p-3 border-b-2'>
            <i className='text-lg ri-map-pin-2-fill'></i>

            <div>
              <h3 className='text-lg font-medium'>555/12-D</h3>

              <p className='text-sm text-gray-600 font-medium'>
                Dharmshala, Himachal Pradesh 177008
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3 p-3 border-b-2'>
            <i className='ri-currency-line'></i>

            <div>
              <h3 className='text-lg font-medium'>
                {props.selectedVehicle.fare}
              </h3>

              <p className='text-sm text-gray-600 font-medium'>
                Cash/Online
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForRide

