import React from 'react'

const CaptainDetails = () => {
    return (
        <div>
          <div className='absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white px-4 pb-6 pt-5 shadow-[0_-8px_24px_rgba(0,0,0,0.12)]'>
        <div className='mb-5 flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm'>
          <div className='flex items-center gap-3'>
            <img
              className='h-12 w-12 rounded-full object-cover'
              src='https://images.ctfassets.net/vztl6s0hp3ro/730j3EU8CMGQShwD1iLV7F/6e1c84839ab12aa03958a33fea129ded/what-is-a-chief-people-officer-and-why-does-it-matter.webp'
              alt='Captain profile'
            />
            <div>
              <h4 className='text-lg font-semibold leading-tight'>Aman Sharma</h4>
              <p className='text-sm font-medium text-gray-500'>Captain</p>
            </div>
          </div>

          <div className='text-right'>
            <h4 className='text-xl font-bold leading-tight'>Rs. 295.20</h4>
            <p className='text-sm font-medium text-gray-500'>Earned</p>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-3 rounded-xl bg-gray-100 p-3'>
          <div className='rounded-lg bg-white p-3 text-center'>
            <i className='ri-timer-flash-line text-2xl'></i>
            <h5 className='mt-1 text-lg font-semibold'>10.2</h5>
            <p className='text-xs font-medium leading-tight text-gray-500'>Hours Online</p>
          </div>

          <div className='rounded-lg bg-white p-3 text-center'>
            <i className='ri-speed-up-line text-2xl'></i>
            <h5 className='mt-1 text-lg font-semibold'>42</h5>
            <p className='text-xs font-medium leading-tight text-gray-500'>Km Driven</p>
          </div>

          <div className='rounded-lg bg-white p-3 text-center'>
            <i className='ri-booklet-line text-2xl'></i>
            <h5 className='mt-1 text-lg font-semibold'>18</h5>
            <p className='text-xs font-medium leading-tight text-gray-500'>Rides Done</p>
          </div>
        </div>

        <button className='mt-5 w-full rounded-lg bg-black p-3 font-semibold text-white'>
          Go Online
        </button>
      </div>
        </div>

    )
}

export default CaptainDetails   
