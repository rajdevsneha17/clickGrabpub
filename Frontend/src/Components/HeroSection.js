import React from 'react'
import main from "../assets/main.jpg"
const HeroSection = () => {
  return (
    <div>
      <div className='flex flex-col lg:flex-row justify-center items-center w-2/2  lg:h-[25rem] md:h-[55rem] h-[45rem] mt-10'>
        
        <div className='lg:w-1/2 w-full lg:mt-10 sm:mt-64 '>
        <img src={main} className=''></img>
        </div>
        <div className='lg:w-1/2 w-full ml-20'>
        <h1 className='font-bold text-gray-800 lg:text-6xl text-3xl lg:mt-10 lg:ml-20  '>JUST CLICK & </h1>
        <h1 className='font-bold text-gray-800 text-6xl lg:ml-20'>GRAB</h1>
        <div className=''>
            <div className='w-4/6 h-14 border-2 border-gray-700 bg-slate-700 lg:ml-20 mt-10 font-bold flex justify-center items-center rounded-full text-gray-200'>Services In your own area </div>
            <div className='w-4/6 h-14 border-2 border-gray-700  bg-slate-800 lg:ml-20 mt-10 font-bold flex justify-center items-center rounded-full text-gray-200'>Employment</div>
            <div className='w-4/6 h-14 border-2 border-gray-700 bg-slate-700 lg:ml-20 mt-10 font-bold flex justify-center items-center rounded-full text-gray-200' >Money </div>
            <div className='w-4/6 h-14 border-2 border-gray-700 bg-slate-800 lg:ml-20 mt-10 font-bold flex justify-center items-center  rounded-full text-gray-200'>Help</div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
