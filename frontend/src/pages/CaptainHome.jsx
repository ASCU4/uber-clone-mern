import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails.jsx'
import RidePopUp from '../components/RidePopUp.jsx'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp.jsx'

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [noRideMessage, setNoRideMessage] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
    })
  }, [ridePopupPanel])

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.3,
    })
  }, [confirmRidePopupPanel])

  const openConfirmRidePopup = () => {
    sessionStorage.removeItem('rideOtpVerified')
    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }

  const returnToRidePopup = () => {
    setConfirmRidePopupPanel(false)
    setRidePopupPanel(true)
  }

  const handleGoOnline = () => {
    const rideOtp = localStorage.getItem('rideOtp')
    if (rideOtp) {
      setRidePopupPanel(true)
    } else {
      setNoRideMessage(true)
      setTimeout(() => {
        setNoRideMessage(false)
      }, 3000)
    }
  }

  return (
    <div className='relative h-screen overflow-hidden bg-white'>
      <img
        className='absolute left-5 top-5 z-20 w-16'
        src='/Uber.svg.png'
        alt='Uber logo'
      />

      <Link
        to='/home'
        className='absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-md'
        aria-label='Go to home'
      >
        <i className='ri-home-5-line'></i>
      </Link>

      {noRideMessage && (
        <div className='absolute top-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300'>
          No ride available
        </div>
      )}

      <div className='h-[55%] w-full'>
        <img
          className='h-full w-full object-cover'
          src='https://miro.medium.com/v2/resize:fit:1100/format:webp/0*gwMx05pqII5hbfmX.gif'
          alt='Uber ride map'
        />
      </div>
      <div className='h-[45%] w-full'>
        <CaptainDetails goOnline={handleGoOnline} />
      </div>
      <div
        ref={ridePopupPanelRef}
        className='fixed bottom-0 z-30 w-full translate-y-full bg-white px-3 py-8'
      >
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          confirmRide={openConfirmRidePopup}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className='fixed inset-x-0 bottom-0 z-40 max-h-[95vh] translate-y-full overflow-y-auto bg-transparent'
      >
        <ConfirmRidePopUp
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          returnToRidePopup={returnToRidePopup}
        />
      </div>
    </div>
  )
}

export default CaptainHome
