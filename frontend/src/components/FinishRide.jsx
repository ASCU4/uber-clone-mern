import React from 'react'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {

    const navigate = useNavigate()


    console.log('[FinishRide] props.ride:', props?.ride)

    async function endRide() {

        console.log('[FinishRide] clicked FinishRide')

        // Clear ride-related data
        localStorage.removeItem('activeRide')
        localStorage.removeItem('rideOtp')
        sessionStorage.removeItem('rideOtpVerified')

        // Close panel
        props.setFinishRidePanel?.(false)

        // Success popup
        alert('Ride Completed Successfully ✅')

        // Redirect captain to home
        navigate('/captain-home')
    }


    if (!props?.ride) {
        return (
            <div className='mx-auto w-full max-w-lg rounded-t-3xl bg-white px-4 py-8 shadow-2xl'>
                <h5
                    className='p-1 text-center w-[93%] absolute top-0'
                    onClick={() => props.setFinishRidePanel?.(false)}
                >
                    <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
                </h5>

                <h3 className='text-xl font-semibold mb-2'>No ride data</h3>

                <button
                    type='button'
                    onClick={() => props.setFinishRidePanel?.(false)}
                    className='mt-5 w-full rounded-lg bg-gray-200 py-2 font-semibold text-gray-700'
                >
                    Close
                </button>
            </div>
        )
    }

    return (
        <div>
            <h5
                className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setFinishRidePanel(false)
                }}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className='text-2xl font-semibold mb-5'>
                Finish this Ride
            </h3>

            <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img
                        className='h-12 rounded-full object-cover w-12'
                        src="https://images.ctfassets.net/vztl6s0hp3ro/730j3EU8CMGQShwD1iLV7F/6e1c84839ab12aa03958a33fea129ded/what-is-a-chief-people-officer-and-why-does-it-matter.webp"
                        alt=""
                    />

                    <h2 className='text-lg font-medium'>
                        {props.ride?.user?.fullname?.firstname ||
                            props.ride?.user?.fullname?.lastname ||
                            "Aman Sharma"}
                    </h2>
                </div>

                <h5 className='text-lg font-semibold'>
                    {props.ride?.distance || '2.2 KM'}
                </h5>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>

                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>

                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>

                            <p className='text-sm -mt-1 text-gray-600'>
                                {typeof props.ride?.pickup === 'object'
                                    ? props.ride?.pickup?.address
                                    : props.ride?.pickup}
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>

                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>

                            <p className='text-sm -mt-1 text-gray-600'>
                                {typeof props.ride?.destination === 'object'
                                    ? props.ride?.destination?.address
                                    : props.ride?.destination}
                            </p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>

                        <div>
                            <h3 className='text-lg font-medium'>
                                ₹{props.ride?.fare ?? props.ride?.vehicle?.fare}
                            </h3>

                            <p className='text-sm -mt-1 text-gray-600'>
                                Cash/Online
                            </p>
                        </div>
                    </div>

                </div>

                <div className='mt-10 w-full'>
                    <button
                        onClick={endRide}
                        className='w-full mt-5 flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'
                    >
                        Finish Ride
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FinishRide