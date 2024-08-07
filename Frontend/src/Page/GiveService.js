import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {toast} from "react-hot-toast"
import axios from "axios"
import Navbar from '../Components/Navbar';
import { Link,useNavigate } from 'react-router-dom';

const services = [
  "Plumbing",
  "Electrician",
  "Tuition",
  "Tiffin Service",
  "Gardening",
  "Cleaning",
  "Carpentry"
];
const addressOptions = [
  "123 Main St, City A",
  "456 Elm St, City B",
  "789 Oak St, City C",
  "101 Pine St, City D"
];

const GiveService = () => {
    const[submit,setSubmit]=useState(false)
    const navigate=useNavigate();
  const { watch, setValue,register, handleSubmit, formState: { errors } } = useForm();
  const [selectedService, setSelectedService] = useState('');
  // const [image, setImage] = useState(null);
  const onSubmit = async data => {
    console.log(data);
    const userData = localStorage.getItem("userLoginData") || localStorage.getItem("userSignupData");
    if (!userData) {
       
      toast.error("Create your Account at Click and Grab");
      navigate("/signup");
      
    } else {
      
        
    if (data.phoneNumber && !data.phoneNumber.startsWith('+91')) {
        data.phoneNumber = `+91${data.phoneNumber}`;
      }
      // Assuming setSelectedService is defined somewhere in your component
      setSelectedService(data.service);
      
      try {
        const res = await axios.post("https://clickgrab-2.onrender.com/giveservice", data);
        toast.success("Data Submitted Successfully");
        setSubmit(true)
        console.log("response data", res.data);
        navigate("/")
      } catch (err) {
        toast.error("Error submitting data");
        console.error("Error response", err);
      }
     
    }

  };
 

  return (
    <div>
      <div><Navbar></Navbar></div>
      <div className="container mx-auto -mt-[0.5rem] p-4 h-sreen lg:w-6/12 w-full md:w-6/12">
   <div className='flex justify-center items-center'>
   <h2 className="text-2xl font-bold mb-4">Service Form</h2>
   </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900">Name</label>
          <input 
            {...register("name", { required: "Name is required" })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Service</label>
        <select
          {...register("service", { required: "Service is required" })}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        >
          <option value="">Select a service</option>
          {services.map((service, index) => (
            <option key={index} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-red-500 text-sm">{errors.service.message}</p>}
      </div>
      {selectedService && (
        <div className="mt-4">
          <p className="text-lg">Selected Service: {selectedService}</p>
        </div>
      )}
        <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <div className="relative mt-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">+91</span>
          <input
            type="tel"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                // value: /^[0-9]{13}$/,
                message: "Invalid phone number"
              }
            })}
            className="p-2 pl-12 border border-gray-300 rounded w-full"
            placeholder="eg:-8054510607"
            value={8054510607}
            maxLength={13}
          />
        </div>
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
      </div>

        <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <select
          {...register("address", { required: "Address is required" })}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        >
          <option value="">Select an address</option>
          {addressOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

      {/* <div className="block text-sm font-medium text-gray-700 mb-2">Image</div>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            {...register("imagefile", { required: "Image is required" })}
            className="hidden"
            id="imagefile"
            onChange={handleImageChange}
          />
          {image ? (
            <img src={image} alt="Uploaded" className="w-32 h-32 object-cover border border-gray-300 rounded" />
          ) : (
            <label
              htmlFor="imagefile"
              className="w-32 h-32 flex items-center justify-center border border-gray-300 rounded cursor-pointer"
            >
              <span className="text-3xl text-gray-400">+</span>
            </label>
          )}
        </div>
        {errors.imagefile && <p className="text-red-500 text-sm">{errors.imagefile.message}</p>} */}

      <div>
          <label className="block text-sm font-medium text-gray-700">Available Timing</label>
          <div className="flex space-x-4 w-2/2">
            <div className='w-1/2'>
              <label className="block text-sm font-medium text-gray-700">From</label>
              <input 
                type="time"
                {...register("fromTime", { required: "From time is required" })}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
              {errors.fromTime && <p className="text-red-500 text-sm">{errors.fromTime.message}</p>}
            </div>
            <div className='w-1/2'>
              <label className="block text-sm font-medium text-gray-700 ">To</label>
              <input 
                type="time"
                {...register("toTime", { required: "To time is required" })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.toTime && <p className="text-red-500 text-sm">{errors.toTime.message}</p>}
            </div>
          </div>
        </div>

        <div>
            <button type="submit" className="bg-slate-800 text-gray-200 font-bold py-2 px-4 rounded hover:bg-slate-700 w-2/6" disabled={submit}>Submit</button>
        </div>
        
      </form>
    </div>
    </div>
  );
};

export default GiveService;
