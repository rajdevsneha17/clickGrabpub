import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { toast } from "react-hot-toast";
import Navbar from '../Components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const TakeService = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [noAvailability, setNoAvailability] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceToBook, setSelectedServiceToBook] = useState(null);

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://clickgrab-2.onrender.com/takeservice");
      setData(response.data);
      setFilteredData(response.data); // Initialize filteredData with all data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFindButtonClick = () => {
    const userData = localStorage.getItem("userLoginData") || localStorage.getItem("userSignupData");

    if (!userData) {
      toast.error("You must have an account to find the contacts.");
      navigate("/signup");
    } else {
      const filtered = data.filter(service => {
        const matchesAddress = selectedAddress ? service.address === selectedAddress : true;
        const matchesService = selectedService ? service.service === selectedService : true;
        return matchesAddress && matchesService;
      });

      const currentTime = moment();
      const filteredAndAvailable = filtered.filter(service => {
        const fromTime = moment(service.fromTime, 'HH:mm');
        const toTime = moment(service.toTime, 'HH:mm');
        return currentTime.isBetween(fromTime, toTime);
      });

      if (filteredAndAvailable.length === 0) {
        setNoAvailability(true);
      } else {
        setNoAvailability(false);
      }

      setFilteredData(filteredAndAvailable);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = moment();
      setFilteredData(prevFilteredData =>
        prevFilteredData.filter(service => {
          const toTime = moment(service.toTime, 'HH:mm');
          return currentTime.isBefore(toTime);
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBookNowClick = (service) => {
    setSelectedServiceToBook(service);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div><Navbar /></div>
      <div className="flex flex-col container mt-8 w-11/12 justify-center items-center">
        <div className="flex flex-col gap-7 space-x-4 w-full mb-4 justify-center items-center">
          <select
            value={selectedAddress}
            onChange={e => setSelectedAddress(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full ml-4 lg:w-4/12 md:w-6/12"
          >
            <option value="">Select Address</option>
            {addressOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <select
            value={selectedService}
            onChange={e => setSelectedService(e.target.value)}
            className="border border-gray-300 p-2 ml-2 rounded w-full lg:w-4/12 md:w-6/12"
          >
            <option value="">Select Service</option>
            {services.map((service, index) => (
              <option key={index} value={service}>{service}</option>
            ))}
          </select>
          <button
            onClick={handleFindButtonClick}
            className="bg-slate-600 text-gray-200 p-2 rounded hover:bg-slate-700 lg:w-2/12 w-4/6 md:w-2/12"
          >
            Find
          </button>
        </div>

        {filteredData.length === 0 && noAvailability && (
          <p className="text-red-500 text-xl font-bold mb-4">Oops! Not available</p>
        )}

        {filteredData.map(service => (
          <div className='flex flex-col justify-center items-center lg:w-2/6' key={service._id}>
            <div className="w-full ml-3 mx-auto bg-slate-100 shadow-md rounded-lg overflow-hidden mb-4">
              <div className="p-4">
                <h1 className="text-2xl font-bold text-gray-800">{service.name}</h1>
                <p className="text-gray-600">{service.service}</p>
                <p className="text-gray-600">Call Now: {service.phoneNumber}</p>
                <p className="text-gray-600">{service.address}</p>
                <p className="text-gray-600 mt-2">Timing: {service.fromTime} - {service.toTime}</p>
                <p className="text-green-600 font-bold">Available</p>
                <button
                  onClick={() => handleBookNowClick(service)}
                  className="bg-slate-800 text-gray-200 p-2 mt-2 rounded hover:bg-slate-700"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}

        {isModalOpen && (
          <Modal
            service={selectedServiceToBook}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

const Modal = ({ service, closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    serviceProviderphoneNumber: service.phoneNumber
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let phoneNumber = formData.phone;
      if (!phoneNumber.startsWith('+91')) {
        phoneNumber = `+91${phoneNumber}`;
      }

      await axios.post("https://clickgrab-2.onrender.com/bookservice", {
        ...formData,
        serviceId: service._id
      });
      closeModal();
      toast.success('Booking confirmed!');
    } catch (error) {
      console.error('Error booking service:', error);
    }
  };

  return (
    <div className="flex fixed inset-0 bg-gray-600 bg-opacity-50 justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Book Service</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mr-2"
            >
              Cancel

            </button>
            <button
              type="submit"
              className="bg-slate-900 text-white p-2 rounded hover:bg-slate-700"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TakeService;



