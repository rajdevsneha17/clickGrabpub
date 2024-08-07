import React, { useState } from 'react';
import {  useLocation } from 'react-router-dom';
import {toast} from "react-hot-toast"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import Navbar from '../Components/Navbar';
const SendOTP = () => {
    const navigate=useNavigate()
  const location = useLocation();
  const { userData } = location.state || {};
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    console.log('OTP Submitted:', otpCode);
  
    const data = {
      email: userData.email, // Ensure email is included
      otp: otpCode, // Send OTP as a string
      fname: userData.fname,
      lname: userData.lname,
      password: userData.password
    };
  
    try {
      const response = await axios.post("https://clickgrab-2.onrender.com/verifyotp", data);
      console.log('OTP verification response:', response.data);
  
      if (response.data.success) {
        toast.success("Signup Successfully");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.response?.data || error.message);
      toast.error('OTP verification failed.');
    }
  };
  

  return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
   
   <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
     <h1 className="text-2xl font-bold mb-4 text-center">OTP Authentication</h1>
     {userData ? (
       <>
         <p className="mb-6 text-center">Enter the 6 digit OTP sent to {userData.email}.</p>
         <form onSubmit={handleSubmit} className="flex justify-center mb-4 space-x-1">
           {otp.map((data, index) => (
             <input
               className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               type="text"
               name="otp"
               maxLength="1"
               key={index}
               value={data}
               onChange={e => handleChange(e.target, index)}
               onFocus={e => e.target.select()}
             />
           ))}
         </form>
         <button
           type="submit"
           onClick={handleSubmit}
           className="w-full py-2 bg-blue-500 text-gray-200 rounded-lg hover:bg-blue-600"
         >
           Submit
         </button>
         <p className="mt-4 text-sm text-center">
           Didn't receive an OTP? <span className="text-blue-500 cursor-pointer">Resend</span>
         </p>
       </>
     ) : (
       <p className="text-center">No user data available.</p>
     )}
   </div>
 </div>
    </div>

  );
};

export default SendOTP;
