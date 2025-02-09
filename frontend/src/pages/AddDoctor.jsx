import React, { useState, useEffect } from "react";
import { addDoctor } from "../service/health";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDoctor = () => {
  const navigate = useNavigate();

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

  const [successPopup, setSuccessPopup] = useState(false);

  // Set email from sessionStorage on component mount
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email") || "";
    setFormData((prevData) => ({
      ...prevData,
      email: storedEmail
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      sessionStorage.setItem("email", value); // Store email in sessionStorage when changed
    }
  };

  const handleSubmit = async (e) => {
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

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await addDoctor(formData, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 201) {
          toast.success("Registered Successfully");
          navigate("/login");
        } else {
          toast.error("Registration Failed");
        }
      } catch (error) {
        console.error("Error while sending data:", error);
      }

      setSuccessPopup(true);
      setTimeout(() => setSuccessPopup(false), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white py-2">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Register Doctor</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Doctor Name */}
          <div>
            <label htmlFor="doc-name" className="block text-sm font-medium text-gray-600">Doctor Name</label>
            <input
              id="doc-name"
              name="name"
              type="text"
              placeholder="Enter doctor's name"
              className={`w-full mt-2 p-3 border-2 rounded-md ${errors.name ? "border-red-500" : "border-gray-300"}`}
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
              className={`w-full mt-2 p-3 border-2 rounded-md ${errors.specialization ? "border-red-500" : "border-gray-300"}`}
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
              placeholder="Enter Years Of Experience"
              className={`w-full mt-2 p-3 border-2 rounded-md ${errors.experience ? "border-red-500" : "border-gray-300"}`}
              value={formData.experience}
              onChange={handleChange}
            />
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
              className={`w-full mt-2 p-3 border-2 rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
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
              className={`w-full mt-2 p-3 border-2 rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
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
              className={`w-full mt-2 p-3 border-2 rounded-md ${errors.contact ? "border-red-500" : "border-gray-300"}`}
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700"
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddDoctor;
