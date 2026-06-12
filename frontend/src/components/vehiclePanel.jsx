import React from 'react'

const vehicles = [
    {
        name: 'UberGo',
        image: '/cabimage.webp',
        alt: 'cab',
        capacity: 4,
        eta: '2 min away',
        description: 'Affordable, compact rides',
        fare: 'Rs. 157.21'
    },
    {
        name: 'Moto',
        image: '/bike.jpg',
        alt: 'bike',
        capacity: 1,
        eta: '4 min away',
        description: 'Affordable, motor ride',
        fare: 'Rs. 54.21'
    },
    {
        name: 'UberAuto',
        image: '/auto.jpg',
        alt: 'auto',
        capacity: 3,
        eta: '2 min away',
        description: 'Affordable, Rickshaw ride',
        fare: 'Rs. 100'
    }
]

const VehiclePanel = (props) => {
    const selectVehicle = (vehicle) => {
        props.setSelectedVehicle(vehicle)
        props.setVehiclePanelOpen(false)
        props.setConfirmRidePanel(true)
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehiclePanelOpen(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a vehicle</h3>

            {vehicles.map((vehicle) => (
                <div
                    key={vehicle.name}
                    onClick={() => selectVehicle(vehicle)}
                    className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'
                >
                    <img className='h-12 w-20 object-contain' src={vehicle.image} alt={vehicle.alt} />
                    <div className='w-1/2'>
                        <h4 className='font-medium text-lg flex items-center gap-2'>
                            {vehicle.name}
                            <span className="flex items-center gap-1">
                                <i className="ri-user-3-fill"></i>
                                {vehicle.capacity}
                            </span>
                        </h4>
                        <h5 className='font-medium text-sm'>{vehicle.eta}</h5>
                        <p className='font-medium text-xs text-gray-600'>{vehicle.description}</p>
                    </div>
                    <h2 className='text-lg font-semibold'>{vehicle.fare}</h2>
                </div>
            ))}
        </div>
    )
}

export default VehiclePanel
