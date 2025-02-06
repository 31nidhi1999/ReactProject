import React, { useState, useContext } from "react";
import { addHospital } from "../service/health";
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AppContext3 } from "../context/AppContext3";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddHospital = () => {
  //const { state, setState } = useContext(AppContext3);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    location: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setFormData({
      ...formData,
      location: `${lat}, ${lng}`,
    });
  };

  const LocationMarker = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addHospital(formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      // Show success toast
      toast.success("Hospital Added Successfully!");

      // Clear form data (optional)
      setFormData({
        name: "",
        location: "",
        contact: "",
      });
    } catch (error) {
      console.error('Error while sending data:', error);
      toast.error("Error while adding hospital.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-white">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Register Hospital</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Hospital Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Hospital Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter hospital name"
              className={`w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-600">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Enter hospital location"
              className={`w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 ${errors.location ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>

          {/* Map */}
          {/* <div className="h-64 mt-4">
            <MapContainer center={[51.505, -0.09]} zoom={13} className="h-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
          </div> */}

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-600">Contact</label>
            <input
              id="contact"
              name="contact"
              type="text"
              placeholder="Enter contact details"
              className={`w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 ${errors.contact ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Hospital
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHospital;
