import React from 'react'

const lookingForRide = (props) => {
    const selectedVehicle = props.selectedVehicle || {
        image: '/cabimage.webp',
        alt: 'cab'
    }

    const showWaitingForRide = () => {
        props.setLookingForRidePanel(false)
        props.setWaitingRidePanel(true)
    }

    return (
        <div>
            <h3 className='text-2xl font-semibold mb-5'>Waiting for rider</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20 object-contain' src={selectedVehicle.image} alt={selectedVehicle.alt} />

                <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
                    <div
                        key={selectedVehicle.name}
                        className='waiting-ride-progress h-full bg-blue-600 rounded-full'
                        onAnimationEnd={showWaitingForRide}
                    ></div>
                </div>

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
                </div>
            </div>
        </div>
    )
}

export default lookingForRide
