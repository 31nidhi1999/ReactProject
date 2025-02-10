import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/ApiConstants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email') || '';
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
  };

  const validateFields = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    setError('');
    const resetData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.put(`${BASE_URL}users/password`, resetData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        toast.success('Password reset successfully');
        navigate('/login');
      } else {
        toast.error('Password reset failed');
      }
    } catch (error) {
      toast.error('Error while resetting password');
      console.error('Error while resetting password:', error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white py-2">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="alert bg-red-100 text-red-700 p-3 rounded">{error}</div>}

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
              readOnly
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your new password"
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
              placeholder="Confirm your new password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Reset Password
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPassword;