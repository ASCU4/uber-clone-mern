import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react' // it is a animation library for react
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel.jsx'
import VehiclePanel from '../components/vehiclePanel.jsx'
import ConfirmRide from '../components/ConfirmRide.jsx'
import LookingForRide from '../components/lookingforRide.jsx'
import WaitingForRide from '../components/waitingforRide.jsx'

const Home =() => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const vehiclePanelOpenRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const lookingForRidePanelRef = useRef(null)
    const waitingRidePanelRef = useRef(null)
    const pannelRef = useRef(null)
    const panelCloseRef = useRef(null) //"ref" basically kise bhi element ko pass karne 
    const logoRef = useRef(null)
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [lookingForRidePanel, setLookingForRidePanel] = useState(false)
    const [waitingRidePanel, setWaitingRidePanel] = useState(false)
    const [rideOtp, setRideOtp] = useState('')
    const [selectedVehicle, setSelectedVehicle] = useState({
        name: 'UberGo',
        image: '/cabimage.webp',
        fare: 'Rs. 157.21'
    })
    // ka kam aata hai jise hum manipulate karna chahte hai 
    // yaha hum pannel ko manipulate karna chahte hai to uske liye useRef ka use kiya hai

    const submitHandler =(e) =>{
        e.preventDefault()
    }

    const createRideOtp = () => {
        const otp = String(Math.floor(1000 + Math.random() * 9000))
        localStorage.setItem('rideOtp', otp)
        setRideOtp(otp)
    }
     //gsap calling function
     useGSAP(function(){
        if(panelOpen){
            gsap.to(pannelRef.current, {
                height:'70%',
                padding:'20px',
                opacity:1
            })
            gsap.to(panelCloseRef.current, {
                opacity:1,
            })
            gsap.to(logoRef.current, {
                opacity:0,
                duration:0.2,
                pointerEvents:'none',
            })
        }else{
            gsap.to(pannelRef.current, {
                height:'0%',
                padding:'0px',
                opacity:0
            })
           gsap.to(panelCloseRef.current, {
            opacity:0,
         })
            gsap.to(logoRef.current, {
                opacity:1,
                duration:0.2,
                pointerEvents:'auto',
            })
        }
     },[panelOpen])

     useGSAP(function(){
        if(vehiclePanelOpen){
            gsap.to(vehiclePanelOpenRef.current, {
                transform: 'translateY(0%)',
            })
        }else{
            gsap.to(vehiclePanelOpenRef.current, {
                transform: 'translateY(100%)',
            })
        }
    }, [vehiclePanelOpen])  
    
     useGSAP(function(){
        if(confirmRidePanel){
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0%)',
            })
        }else{
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)',
            })
        }
    }, [confirmRidePanel])    

    useGSAP(function(){
        if(lookingForRidePanel){
            gsap.to(lookingForRidePanelRef.current, {
                transform: 'translateY(0%)',
            })
        }else{
            gsap.to(lookingForRidePanelRef.current, {
                transform: 'translateY(100%)',
            })
        }
    }, [lookingForRidePanel])

    useGSAP(function(){
        if(waitingRidePanel){
            gsap.to(waitingRidePanelRef.current, {
                transform: 'translateY(0%)',
            })
        }else{
            gsap.to(waitingRidePanelRef.current, {
                transform: 'translateY(100%)',
            })
        }
    }, [waitingRidePanel])


    return(
        <div className='h-screen relative overflow-hidden'>
           <img ref={logoRef} src='/Uber.svg.png' alt='Uber Logo' className='w-16 absolute left-5 top-5 z-20' />
        
        <div onClick ={()=>{
            setVehiclePanelOpen(false)
        }

        }  className ='h-screen w-screen absolute inset-0 z-0'>
            {/* temp image */}
            <img className='h-full w-full object-cover'src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png" alt="Uber Ride"  />
        </div>
           <div className='flex flex-col justify-end h-screen absolute top-0 w-full z-10'>

            <div className='h-[30%] p-6 bg-white relative '>

                <h5 ref={panelCloseRef}onClick={()=>{
                    setPanelOpen(false)
                }} className ='absolute opacity-0 top-1 right-6 text-2xl cursor-pointer'>
                    v
                </h5>

                 <h4 className='text-3xl font-semibold'>Find a trip</h4>
              <form onSubmit={(e)=>{
                 submitHandler(e)
              }}>
                <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"> </div>
                <input 
                onClick={()=>{
                    setPanelOpen(true)
                }}
                value={pickup}
                onChange={(e)=>{
                    setPickup(e.target.value)
                }}
                className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
                type="text" 
                placeholder='Add a pick-up location?'/>

                <input 
                 onClick={()=>{
                    setPanelOpen(true)
                }}

                value={destination}
                onChange={(e)=>{
                    setDestination(e.target.value)
                }}
                className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'
                type="text" 
                placeholder='Enter your destination'/>

              </form>
            </div>
            <div ref={pannelRef} className= ' bg-white h-0 '>
                <LocationSearchPanel setPanelOpen={setPanelOpen}  setVehiclePanelOpen={setVehiclePanelOpen}/>
                    </div> 
            </div>
            <div ref={vehiclePanelOpenRef}className='fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-8'>
             <VehiclePanel
                setVehiclePanelOpen={setVehiclePanelOpen}
                setConfirmRidePanel={setConfirmRidePanel}
                setSelectedVehicle={setSelectedVehicle}
             />
            </div>
            <div ref={confirmRidePanelRef}className='fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-8'>
             <ConfirmRide
                setConfirmRidePanel={setConfirmRidePanel}
                setVehiclePanelOpen={setVehiclePanelOpen}
                setPanelOpen={setPanelOpen}
                setLookingForRidePanel={setLookingForRidePanel}
                createRideOtp={createRideOtp}
                selectedVehicle={selectedVehicle}
             />
            </div>
            <div ref={lookingForRidePanelRef}className='fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-8'>
             {lookingForRidePanel && (
                <LookingForRide
                    selectedVehicle={selectedVehicle}
                    setLookingForRidePanel={setLookingForRidePanel}
                    setWaitingRidePanel={setWaitingRidePanel}
                />
             )}
            </div>
            <div ref={waitingRidePanelRef}className='fixed w-full z-10 bottom-0  translate-y-full bg-white px-3 py-8'>
             {waitingRidePanel && (
                <WaitingForRide
                    selectedVehicle={selectedVehicle}
                    setWaitingRidePanel={setWaitingRidePanel}
                    otp={rideOtp}
                />
             )}
            </div>
        </div>
    ) 
}

export default Home
