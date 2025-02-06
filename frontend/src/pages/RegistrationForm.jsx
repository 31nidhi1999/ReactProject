import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/ApiConstants';
import { toast } from 'react-toastify';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    //gender: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFields = () => {
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#@$*]).{5,20}$/;

    if (!nameRegex.test(formData.firstName)) {
      setError('First name must contain only letters and not be empty.');
      return false;
    }

    if (!nameRegex.test(formData.lastName)) {
      setError('Last name must contain only letters and not be empty.');
      return false;
    }

    if (!phoneRegex.test(formData.phone)) {
      setError('Phone number must be exactly 10 digits.');
      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      setError(
        'Password must be 5-20 characters long, contain at least one digit, one lowercase letter, one uppercase letter, and one special character (#@$*).'
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
      const savedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        password: formData.password
      };

      console.log(savedData);
      try {
        const response = await axios.post(`${BASE_URL}patient`, savedData, {
          headers: { 'Content-Type': 'application/json' }
        });
        toast("Registration Successful");
        navigate("/login");
      } catch (error) {
        console.error("Error while sending data:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-white py-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-center text-2xl font-bold mb-4">Register Patient</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="alert bg-red-100 text-red-700 p-3 rounded">{error}</div>}

          <div>
            <label htmlFor="firstName" className="block text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="text"
              className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder="Enter your phone number, digits only"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a strong password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
