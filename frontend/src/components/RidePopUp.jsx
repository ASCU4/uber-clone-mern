import React from 'react'

const RidePopUp = (props) => {
    const userFullName = [
        props.ride?.user?.fullname?.firstname,
        props.ride?.user?.fullname?.lastname
    ].filter(Boolean).join(' ') || 'Aman Sharma'

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-1'>
                    <img className='h-12 w-12 -mr-2 rounded-full object-cover' src="https://images.ctfassets.net/vztl6s0hp3ro/730j3EU8CMGQShwD1iLV7F/6e1c84839ab12aa03958a33fea129ded/what-is-a-chief-people-officer-and-why-does-it-matter.webp" alt="" />
                    <h2 className='ml-3 text-lg font-medium'>{userFullName}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Hamirpur, Himachal Pradesh 177001</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>555/12-D</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Dharmshala, Himachal Pradesh 177008</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹157.21 </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <div className='mt-5 w-full '>
                    <button onClick={() => {
                        props.confirmRide()

                    }} className=' bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg'>Confirm</button>

                    <button onClick={() => {
                        props.setRidePopupPanel(false)

                    }} className='mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg'>Ignore</button>


                </div>
            </div>
        </div>
    )
}   

export default RidePopUp
