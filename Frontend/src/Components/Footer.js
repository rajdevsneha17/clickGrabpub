import React from 'react';

const Footer = () => {
  return (
    <div className='bg-slate-800 mt-10'>
      <div className='w-full h-auto lg:h-64 flex flex-col lg:flex-row justify-around pt-10 text-gray-200'>
        <div className='mb-6 lg:mb-0 w-full lg:w-1/4 px-4'>
          <p className='font-bold mb-2'>Our Services</p>
          <p>24/7 Availability</p>
          <p>High-Quality Services</p>
          <p>Expert Professionals</p>
          <p>Customer Satisfaction</p>
        </div>
        <div className='mb-6 lg:mb-0 w-full lg:w-1/4 px-4'>
          <p className='font-bold mb-2'>Payment Options</p>
          <p>Pay After Service</p>
          <p>No Upfront Fees</p>
          <p>Flexible Payment Plans</p>
          <p>Contact for Details</p>
        </div>
        <div className='mb-6 lg:mb-0 w-full lg:w-1/4 px-4'>
          <p className='font-bold mb-2'>Contact Us</p>
          <p>Email: support@ecomexample.com</p>
          <p>Phone: +91 987652137</p>
          <p>Address: 123 Main St,Mohali, India</p>
          <p>Social Media: @ecom</p>
        </div>
        {/* <div className='mb-6 lg:mb-0 w-full lg:w-1/4 px-4'>
          <p className='font-bold mb-2'>Quick Links</p>
          <p>Home</p>
          <p>About Us</p>
          <p>Services</p>
          <p>Contact</p>
        </div> */}
      </div>
      <div className='flex bg-gray-900 w-full h-10 shadow-xl justify-center items-center'>
        <p className='text-gray-200'>© 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
