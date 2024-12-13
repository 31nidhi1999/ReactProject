import React, { useState } from "react";
import { addHospital } from "../service/health";

const AddHospital = () => {
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

  const [successPopup, setSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    let newErrors = {};

    // Validation logic
    if (!formData.name) newErrors.name = "Hospital name is required.";
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.contact) {
      newErrors.contact = "Contact number is required.";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Valid contact number is required (10 digits).";
    }

    setErrors(newErrors);

    // If there are no errors, proceed with form submission and show success popup
    if (Object.keys(newErrors).length === 0) {
      // Here you can handle the form submission logic like sending data to an API
      console.log("Form submitted successfully", formData);

       try {
                  const response = await addHospital(formData, {
                    headers: { 'Content-Type': 'application/json' }
                  });
                 } catch (error) {
                  console.error("Error while sending data:", error);
                 }


      
      // Show success popup
      setSuccessPopup(true);

      // Hide success popup after 3 seconds
      setTimeout(() => {
        setSuccessPopup(false);
      }, 3000);

      // Clear form data (optional)
      setFormData({
        name: "",
        location: "",
        contact: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-12">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Add Hospital</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Hospital Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Hospital Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter hospital name"
              className={`w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 ${errors.name ? "border-red-500" : "border-gray-300"} focus:ring-blue-500`}
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
              className={`w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 ${errors.location ? "border-red-500" : "border-gray-300"} focus:ring-blue-500`}
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-600">Contact</label>
            <input
              id="contact"
              name="contact"
              type="tel"
              placeholder="Enter contact number"
              className={`w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 ${errors.contact ? "border-red-500" : "border-gray-300"} focus:ring-blue-500`}
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Hospital
            </button>
          </div>
        </form>

        {/* Success Popup */}
        {successPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-green-600">Hospital Added Successfully!</h2>
              <button
                onClick={() => setSuccessPopup(false)}
                className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddHospital;
