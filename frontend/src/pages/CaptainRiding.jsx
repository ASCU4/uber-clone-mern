import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

    const [ finishRidePanel, setFinishRidePanel ] = useState(false)

    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride
    console.log('[CaptainRiding] location.state?.ride:', rideData)




    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)',
                ease: 'power4.out',
                duration: 0.6
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)',
                ease: 'power4.in',
                duration: 0.5
            })
        }
    }, [ finishRidePanel ])


    return (
        <div className='h-screen relative flex flex-col justify-end overflow-hidden'>

            <div className='fixed p-6 top-0 flex items-center justify-between w-full z-10'>
                <div className='opacity-0 pointer-events-none'>
                    <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
                </div>
                <Link to='/captain-home' className='h-11 w-11 bg-white flex items-center justify-center rounded-full shadow-lg border border-gray-100 active:scale-95 transition-transform'>
                    <i className="text-xl font-bold ri-logout-box-r-line text-gray-800"></i>
                </Link>
            </div>

            <div 
                className={`fixed inset-0 bg-black/20 z-[400] transition-opacity duration-500 ${finishRidePanel ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setFinishRidePanel(false)}
            />

            <div className='h-1/5 p-6 flex flex-col justify-center items-center relative bg-yellow-400 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.1)] transition-all active:bg-yellow-500 cursor-pointer'
                onClick={() => {
                    setFinishRidePanel(true)
                }}
            >
                <div className='absolute top-3 w-12 h-1.5 bg-yellow-600/30 rounded-full' />
                
                <div className='flex items-center justify-between w-full mt-2'>
                    <div className='flex flex-col'>
                        <h4 className='text-2xl font-bold text-gray-900 tracking-tight'>
                            {rideData?.distance || '4.2 KM'}
                        </h4>
                        <p className='text-sm font-semibold text-yellow-800 uppercase tracking-widest'>Distance left</p>
                    </div>
                    <button className='bg-black text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl active:scale-95 transition-transform flex items-center gap-2'>
                        Finish <i className="ri-check-double-line text-lg"></i>
                    </button>
                </div>
            </div>

            <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.2)] px-4 py-10'>
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel} />
            </div>


            <div className='h-screen fixed w-screen top-0 z-[-1]'>
                <LiveTracking />
            </div>


        </div>
    )
}

export default CaptainRiding