import React from 'react'

const ConfirmRide = (props) => {
    const selectedVehicle = props.selectedVehicle || {
        image: '/cabimage.webp',
        alt: 'cab',
        fare: 'Rs. 157.21'
    }

    const goBackToFindTrip = () => {
        props.setConfirmRidePanel(false)
        props.setVehiclePanelOpen(true)
        props.setPanelOpen(false)
    }

    const confirmRide = () => {
        props.createRideOtp()
        props.setConfirmRidePanel(false)
        props.setLookingForRidePanel(true)
    }

    return (
        <div>
            <h5
                className='p-1 text-center w-[93%] absolute top-0'
                onClick={() => {
                    props.setConfirmRidePanel(false)
                }}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className='text-2xl font-semibold mb-5'>Confirm your ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20 object-contain' src={selectedVehicle.image} alt={selectedVehicle.alt} />

                <div className='w-full'>
                    <div className='flex items-center gap-3 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>565/12-D</h3>
                            <p className='text-sm text-gray-600 font-medium'>Hamirpur, Himachal Pradesh 177001</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>555/12-D</h3>
                            <p className='text-sm text-gray-600 font-medium'>Dharmshala, Himachal Pradesh 177008</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 p-3 border-b-2'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{selectedVehicle.fare}</h3>
                            <p className='text-sm text-gray-600 font-medium'>Cash/Online</p>
                        </div>
                    </div>

                    <button
                        onClick={confirmRide}
                        className='w-full bg-green-600 text-white font-semibold p-2 mt-5'
                    >
                        Confirm Ride
                    </button>
                    <button
                        onClick={goBackToFindTrip}
                        className='w-full bg-red-600 text-white font-semibold p-2 mt-3'
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRide
