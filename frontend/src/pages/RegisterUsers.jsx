import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import AddDoctor from './AddDoctor';

const RegisterUsers = () => {
  const [userType, setUserType] = useState(''); // State to track the selected user type

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <div className="flex justify-center items-center bg-white py-2">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Register User</h2>
        <div className="mb-4">
          <label htmlFor="userType" className="block text-gray-700 font-medium">Select User Type</label>
          <select
            id="userType"
            name="userType"
            value={userType}
            onChange={handleUserTypeChange}
            className="form-select mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select User Type</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {userType === 'patient' && <RegistrationForm />}
        {userType === 'doctor' && <AddDoctor />}
      </div>
    </div>
  );
};

export default RegisterUsers;