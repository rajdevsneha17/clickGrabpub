// import React from 'react'
// import { useState } from 'react';
// import GiveService from '../Components/GiveService'
// import TakeService from '../Components/TakeService';
// const Home = () => {
// const [showGiveService, setShowGiveService] = useState(false);
// const [showTakeService, setShowTakeService] = useState(false);
// const handleButtonClick=()=>{
//     setShowGiveService(true);
// }
// const handleButtonClick2=()=>{
//     setShowTakeService(true);
// }
//   return (
//     <div>
//       <div className='w-full h-screen '>
//       {!showGiveService && (
//        <div>
//          <button
//           className="text-black border-2 border-black p-2 hover:bg-gray-400"
//           onClick={handleButtonClick}
//         >
//           Give Service
//         </button>
//         <button
//           className="text-black border-2 border-black p-2 hover:bg-gray-400"
//           onClick={handleButtonClick2}
//         >
//           Take Service
//         </button>
//        </div>
//       )}
//     {showGiveService && <GiveService />}
//     {showTakeService && <TakeService />}
//       </div>
//     </div>
//   )
// }

// export default Home
import React, { useState } from 'react';
import GiveService from '../Components/GiveService';
import TakeService from '../Components/TakeService';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import Cards from '../Components/Cards';
import Footer from '../Components/Footer';
import {useNavigate} from 'react-router-dom'
const Home = () => {
  const navigate=useNavigate()
  const [showGiveService, setShowGiveService] = useState(false);
  const [showTakeService, setShowTakeService] = useState(false);

  const handleGiveServiceClick = () => {
    navigate("/giveservice")
    setShowGiveService(true);
    setShowTakeService(false); // Hide Take Service button when Give Service is clicked
  };

  const handleTakeServiceClick = () => {
    navigate("/takeservice")
    setShowTakeService(true);
    setShowGiveService(false); // Hide Give Service button when Take Service is clicked
  };

  return (
    <div className='w-full h-screen '>
      <div><Navbar></Navbar></div>
    
       <HeroSection></HeroSection>
     
      <div className='w-full h-20 bg-slate-400 mt-48  '>
      <div className='flex justify-center items-center h-full'>
        {/* Conditional rendering based on showGiveService and showTakeService */}
        {!showGiveService && !showTakeService && (
          <div className='flex space-x-4'>
            <button
              className='text-black border-2 border-black p-2 hover:bg-gray-400'
              onClick={handleGiveServiceClick}
            >
              Give Service
            </button>
            <button
              className='text-black border-2 border-black p-2 hover:bg-gray-400'
              onClick={handleTakeServiceClick}
            >
              Take Service
            </button>
          </div>
        )}
      </div>
      </div>
<div><Cards></Cards></div>
      {/* Conditional rendering of GiveService and TakeService components */}
      {showGiveService && <GiveService />}
      {showTakeService && <TakeService />}
      <div><Footer></Footer></div>
    </div>
  );
};

export default Home;
