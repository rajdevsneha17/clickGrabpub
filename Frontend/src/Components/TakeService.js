

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import moment from 'moment';

// const TakeService = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState('');
//   const [selectedService, setSelectedService] = useState('');
//   const [noAvailability, setNoAvailability] = useState(false); // State to track availability

//   // Options for services and addresses
//   const services = [
//     "Plumbing",
//     "Electrician",
//     "Tuition",
//     "Tiffin Service",
//     "Gardening",
//     "Cleaning",
//     "Carpentry"
//   ];
  
//   const addressOptions = [
//     "123 Main St, City A",
//     "456 Elm St, City B",
//     "789 Oak St, City C",
//     "101 Pine St, City D"
//   ];

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:7005/api/v1/takeservice');
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleFindButtonClick = () => {
//     const filtered = data.filter(service => {
//       // Check if service address and service type match selected criteria
//       return service.address === selectedAddress && service.service === selectedService;
//     });

//     // Filter further to show only those services within current time range
//     const currentTime = moment();
//     const filteredAndAvailable = filtered.filter(service => {
//       const fromTime = moment(service.fromTime, 'HH:mm');
//       const toTime = moment(service.toTime, 'HH:mm');
//       return currentTime.isBetween(fromTime, toTime);
//     });

//     if (filteredAndAvailable.length === 0) {
//       setNoAvailability(true); // Set state to indicate no availability
//     } else {
//       setNoAvailability(false); // Reset state if availability found
//     }

//     setFilteredData(filteredAndAvailable);
//   };

//   // Simulate automatic hiding of cards after time ends (you can adjust this logic as per your needs)
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const currentTime = moment();
//       const updatedFilteredData = filteredData.filter(service => {
//         const toTime = moment(service.toTime, 'HH:mm');
//         return currentTime.isBefore(toTime); // Only show cards where current time is before end time
//       });
//       setFilteredData(updatedFilteredData);
//     }, 1000); // Check every second

//     return () => clearInterval(timer);
//   }, [filteredData]);

//   return (
//     <div className="container mx-auto">
//       {/* Dropdowns for address and service selection */}
//       <div className="flex space-x-4 mb-4">
//         <select
//           value={selectedAddress}
//           onChange={e => setSelectedAddress(e.target.value)}
//           className="border border-gray-300 p-2 rounded"
//         >
//           <option value="">Select Address</option>
//           {addressOptions.map((option, index) => (
//             <option key={index} value={option}>{option}</option>
//           ))}
//         </select>
//         <select
//           value={selectedService}
//           onChange={e => setSelectedService(e.target.value)}
//           className="border border-gray-300 p-2 rounded"
//         >
//           <option value="">Select Service</option>
//           {services.map((service, index) => (
//             <option key={index} value={service}>{service}</option>
//           ))}
//         </select>
//         <button
//           onClick={handleFindButtonClick}
//           className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
//         >
//           Find
//         </button>
//       </div>

//       {/* Display filtered and available service cards */}
//       {filteredData.length === 0 && noAvailability && (
//         <p className="text-red-500 text-xl font-bold mb-4">Oops! Not available</p>
//       )}

//       {filteredData.map(service => (
//         <div key={service._id} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4">
//           <div className="p-4">
//             <h1 className="text-2xl font-bold text-gray-800">{service.name}</h1>
//             <p className="text-gray-600">{service.service}</p>
//             <p className="text-gray-600">{service.phoneNumber}</p>
//             <p className="text-gray-600">{service.address}</p>
//             <p className="text-gray-600 mt-2">Timing: {service.fromTime} - {service.toTime}</p>
//             <p className="text-green-500">Available</p> {/* Show availability status */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TakeService;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import {toast} from "react-hot-toast"

const TakeService = () => {
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
      const response = await axios.get('https://clickgrab-2.onrender.com/takeservice');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFindButtonClick = () => {
    const filtered = data.filter(service => {
      return service.address === selectedAddress && service.service === selectedService;
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
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = moment();
      const updatedFilteredData = filteredData.filter(service => {
        const toTime = moment(service.toTime, 'HH:mm');
        return currentTime.isBefore(toTime);
      });
      setFilteredData(updatedFilteredData);
    }, 1000);

    return () => clearInterval(timer);
  }, [filteredData]);

  const handleBookNowClick = (service) => {
    setSelectedServiceToBook(service);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex space-x-4 mb-4">
        <select
          value={selectedAddress}
          onChange={e => setSelectedAddress(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">Select Address</option>
          {addressOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <select
          value={selectedService}
          onChange={e => setSelectedService(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">Select Service</option>
          {services.map((service, index) => (
            <option key={index} value={service}>{service}</option>
          ))}
        </select>
        <button
          onClick={handleFindButtonClick}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Find
        </button>
      </div>

      {filteredData.length === 0 && noAvailability && (
        <p className="text-red-500 text-xl font-bold mb-4">Oops! Not available</p>
      )}

      {filteredData.map(service => (
        <div key={service._id} className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">{service.name}</h1>
            <p className="text-gray-600">{service.service}</p>
            <p className="text-gray-600">Call Now: {service.phoneNumber}</p>
            <p className="text-gray-600">{service.address}</p>
            <p className="text-gray-600 mt-2">Timing: {service.fromTime} - {service.toTime}</p>
            <p className="text-green-500">Available</p>
            <button
              onClick={() => handleBookNowClick(service)}
              className="bg-blue-500 text-white p-2 mt-2 rounded hover:bg-blue-600"
            >
              Book Now
            </button>
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
  );
};

const Modal = ({ service, closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    serviceProviderphoneNumber:service.phoneNumber
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
      // Now phoneNumber is in the correct format
      console.log('Phone number:', phoneNumber);
      // Assuming you have an endpoint to send the booking data
      await axios.post('https://clickgrab-2.onrender.com/bookservice', {
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex lg:flex-row flex-col justify-center items-center">
      <div className="flex lg:flex-row flex-col bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
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
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
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

