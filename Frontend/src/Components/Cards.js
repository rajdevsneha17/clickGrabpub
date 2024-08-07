import React from 'react'
import tiffin from "../assets/tiffin.png"
import plumbing from "../assets/plumbing.png"
import carpentary from "../assets/carpentary.png"
import gardening from "../assets/gardening.png"
import tuition from "../assets/tuition.png"
import electrician from "../assets/electrician.png"
const Cards = () => {
  return (
    <div className='' >
      <div className=' h-16 font-bold bg-slate-900 lg:text-4xl md:text-2xl sm:text-xl text-gray-200 lg:flex-row flex flex-col justify-center items-center'><h1>Which Services You Can Give & Take?</h1></div>
       <div className='flex flex-col lg:flex-row justify-center lg:justify-around items-center '>

       <div className='lg:w-48 h-48 w-4/6 mt-12 bg-slate-300 shadow-md rounded-md '>
       <p className='font-bold flex justify-center items-center text-3xl'>Tiffin</p>
      <div className='flex justify-center items-center'>
      <img src={tiffin} className='w-32 h-32 rounded-md mt-4 ' ></img>
      </div>
       </div>
       <div className='lg:w-48 h-48 w-4/6 mt-12 bg-slate-300 shadow-md rounded-md'>
       <p className='font-bold flex justify-center items-center text-3xl'>Plumbing</p>
   <div className='flex justify-center items-center'>
   <img src={plumbing} className='w-32 h-32 rounded-md mt-4 ' ></img>
   </div>
       </div>
       <div className='lg:w-48 h-48 w-4/6 mt-12 bg-slate-300 shadow-md rounded-md '>
       <p className='font-bold flex justify-center items-center text-3xl'>Electrician</p>
       <div  className='flex justify-center items-center'>
       <img src={electrician} className='w-32 h-32 rounded-md mt-4 ' ></img>
       </div>
       </div>
       <div className='lg:w-48 h-48 w-4/6 mt-12 bg-slate-300 shadow-md rounded-md '>
       <p className='font-bold flex justify-center items-center text-3xl'>Tuition</p>
       <div  className='flex justify-center items-center'>
       <img src={tuition} className='w-32 h-32 rounded-md mt-4 ' ></img>
       </div>
       </div>
       <div className='lg:w-48 h-48 w-4/6 mt-12 bg-slate-300 shadow-md rounded-md '>
       <p className='font-bold flex justify-center items-center text-3xl'>Gardening</p>
       <div  className='flex justify-center items-center'>
       <img src={gardening} className='w-32 h-32 rounded-md mt-4 ' ></img>
       </div>
       
       </div>
       <div className='lg:w-48 h-48 w-4/6 mt-12 bg-slate-300 shadow-md  rounded-md'>
         <p className='font-bold flex justify-center items-center text-3xl'>Carpentry</p>
         <div  className='flex justify-center items-center'>
       <img src={carpentary} className='w-32 h-32 rounded-md mt-4' ></img>
       </div>
       </div>
     
       </div>
       <div className='w-full h-16 bg-gray-900 mt-10'>
        <p className='font-bold flex justify-center items-center text-gray-200 text-3xl pt-5'>AND Many More</p>
       </div>
       <div className='w-full h-[40rem] bg-gray-100'>
       <div className='p-4'>
  <h3 className='w-full h-16 mt-10 font-bold flex justify-center items-center text-3xl'>
    How To Use it?
  </h3>
  <div className='space-y-4'>
    <h3 className='w-full md:w-4/6 h-14 bg-slate-400 mt-10 border-2 shadow-lg border-gray-500 font-bold flex justify-start items-start rounded-r-full p-4 text-center lg:text-lg md:text-md text-xs'>
      Choose whether you want to Give or Take Service
    </h3>
    <h3 className='w-full md:w-5/6 h-14 bg-slate-300 mt-10 border-2 shadow-lg border-gray-500 font-bold flex justify-center items-center rounded-r-full p-4 text-center lg:text-lg md:text-md text-xs'>
      If you want to give the service, just fill out the form and you'll receive an SMS from our team and a call from the customer
    </h3>
    <h3 className='w-full md:w-3/6 h-14 bg-slate-400 mt-10 border-2 shadow-lg border-gray-500 font-bold flex justify-center items-center rounded-r-full p-4 text-center lg:text-lg md:text-md text-xs'>
      Want to take the service? Choose the area and select the service you want
    </h3>
    <h3 className='w-full md:w-5/6 h-14 bg-slate-300 mt-10 border-2 shadow-lg border-gray-500  font-bold flex justify-start items-start rounded-r-full p-4 text-center lg:text-lg md:text-md text-xs'>
      Complete the form and book your service provider
    </h3>
    <h3 className='w-full md:w-4/6 h-14 bg-slate-400 border-2 shadow-lg border-gray-500 mt-10 font-bold flex justify-center items-center rounded-r-full p-4 text-center lg:text-lg md:text-md text-xs'>
      Enjoy the service
    </h3>
  </div>
</div></div>

    </div>
  )
}

export default Cards
