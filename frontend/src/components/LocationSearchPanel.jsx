import React from 'react'

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanelOpen }) => {
    const location = [1, 2, 3]
    return (
        <div>
            {/*this is a sample data */}
              {
                location.map(function(elem, idx){
                  return <div key={idx} onClick={()=>{
                    setVehiclePanelOpen(true)
                    setPanelOpen(false)
                  }} className ='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
              <h2 className="bg-[#eee] h-10   flex items-center justify-center w-12 rounded-full"><i className="ri-map-pin-fill "></i></h2>
              <h4 className='font-medium'>Suraj Sweets - Bakers & Restaurant In Hamirpur, near SDM Residence, Dankwali, Hamirpur, Himachal Pradesh 177001</h4>
            </div>
                })
    }

        </div>
    )
}

export default LocationSearchPanel
