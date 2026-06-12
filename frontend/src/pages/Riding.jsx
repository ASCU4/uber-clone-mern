import React from 'react'
import { Link } from 'react-router-dom'

const defaultVehicle = {
    image: '/cabimage.webp',
    alt: 'cab',
    fare: 'Rs. 157.21'
}

const Riding = ({ selectedVehicle = defaultVehicle }) => {
    return (
        <div className='relative h-screen'>
            <Link to= '/home' className='fixed right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white'>
                <i className="ri-home-5-line"></i>
            </Link>

            <div className='h-1/2'>
                <img
                    className='h-full w-full object-cover'
                    src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png"
                    alt="Uber Ride"
                />
            </div>

            <div className='relative -mt-20 h-[calc(50%+5rem)] rounded-t-3xl bg-white p-4'>
                <div className='flex items-center justify-between'>
                    <img
                        className='h-20 w-32 object-contain translate-x-4'
                        src={selectedVehicle.image}
                        alt={selectedVehicle.alt}
                    />
                    <div className='text-right'>
                        <div className='inline-block rounded-md bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 mb-2'>
                            4 min away
                        </div>
                        <h2 className='text-lg font-medium'>Sachin</h2>
                        <h4 className='text-xl font-bold mt-1 -mb-1'>HP67 AB 1234</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-3'>
                        <div className='flex items-center gap-3 p-2 border-b-2'>
                            <i className="ri-map-pin-user-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>565/12-D</h3>
                                <p className='text-sm text-gray-600 font-medium'>Hamirpur, Himachal Pradesh 177001</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-3 p-2 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>555/12-D</h3>
                                <p className='text-sm text-gray-600 font-medium'>Dharmshala, Himachal Pradesh 177008</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-3 p-2 border-b-2'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>{selectedVehicle.fare}</h3>
                                <p className='text-sm text-gray-600 font-medium'>Cash/Online</p>
                            </div>
                        </div>
                    </div>

                    <button className='w-full bg-green-600 text-white font-semibold p-3 mt-3 rounded-lg'>
                        Make a Payment
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Riding
