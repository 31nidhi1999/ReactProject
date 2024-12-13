import React, { useState } from "react";
import { addDoctor } from "../service/health";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    email: "",
    password: "",
    contact: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    specialization: "",
    experience: "",
    email: "",
    password: "",
    contact: "",
  });

  const [successPopup, setSuccessPopup] = useState(false); // State for success popup

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
    if (!formData.name) newErrors.name = "Doctor's name is required.";
    if (!formData.specialization) newErrors.specialization = "Specialization is required.";
    if (!formData.experience) newErrors.experience = "Experience is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required.";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (!formData.contact || !/^\d{10}$/.test(formData.contact)) newErrors.contact = "Valid contact number is required.";

    setErrors(newErrors);

    // If there are no errors, proceed with form submission and show success popup
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully", formData);
      // Here you would submit the form data, e.g., send it to an API

      //const fillDctorInfo = async()=>{
           try {
            const response = await addDoctor(formData, {
              headers: { 'Content-Type': 'application/json' }
            });
           } catch (error) {
            console.error("Error while sending data:", error);
           }
      //}


      // Show success popup
      setSuccessPopup(true);

      // Hide success popup after 3 seconds
      setTimeout(() => {
        setSuccessPopup(false);
      }, 3000);

      // Optionally, clear the form data after successful submission
      setFormData({
        name: "",
        specialization: "",
        experience: "",
        email: "",
        password: "",
        contact: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-12">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Add Doctor</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Doctor Name */}
          <div>
            <label htmlFor="doc-name" className="block text-sm font-medium text-gray-600">Doctor Name</label>
            <input
              id="doc-name"
              name="name"
              type="text"
              placeholder="Enter doctor's name"
              className={`w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 ${errors.name ? "border-red-500" : "border-gray-300"} focus:ring-blue-500`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Specialization */}
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-600">Specialization</label>
            <input
              id="specialization"
              name="specialization"
              type="text"
              placeholder="Enter specialization"
              className={`w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 ${errors.specialization ? "border-red-500" : "border-gray-300"} focus:ring-blue-500`}
              value={formData.specialization}
              onChange={handleChange}
            />
            {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-600">Experience</label>
            <input
              id="experience"
              name="experience"
              type="number"
              placeholder="Enter Year Of experience"
              className={`w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 ${errors.experience ? "border-red-500" : "border-gray-300"} focus:ring-blue-500`}
              value={formData.experience}
              onChange={handleChange}
            />
            
            {/* <select
              id="experience"
              name="experience"
              className={`w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 ${errors.experience ? "border-red-500" : "border-gray-300"} focus:ring-blue-500`}
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="">Select Experience</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
              <option value="5">5 Years</option>
            </select> */}
            {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter doctor's email"
              className={`w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-blue-500`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              className={`w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 ${errors.password ? "border-red-500" : "border-gray-300"} focus:ring-blue-500`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
              Add Doctor
            </button>
          </div>
        </form>

        {/* Success Popup */}
        {successPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold text-green-600">Doctor Added Successfully!</h2>
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

export default AddDoctor;
