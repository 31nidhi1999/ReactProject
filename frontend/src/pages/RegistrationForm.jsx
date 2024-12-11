import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import axios from 'axios';
import { BASE_URL } from '../constants/ApiConstants';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
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

    if (!formData.gender) {
      setError('Please select your gender.');
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

  const handleSubmit = async(e) => {
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
        password:formData.password
      };

      console.log(savedData);
        try{
            const response = await axios.post(`${BASE_URL}patient`,savedData,{ 
              headers: { 'Content-Type': 'application/json' } 
            });
            alert("Registration Succesfull");
            navigate("/login")
        }catch(error){
            console.error("error while sending data :",error);
        }
      
    }

    
  };


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create an Account</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            placeholder="Enter your phone number , digits only"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="MALE"
              onChange={handleChange}
            />
            <label htmlFor="male" className="me-3">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="FEMALE"
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a strong password"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
