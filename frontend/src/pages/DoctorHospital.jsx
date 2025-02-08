import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoctorToHospital, getHospitalsWhereDoctorIsNotWorkingByDoctorId } from '../service/health';
import DoctorSideBar from '../components/DoctorSideBar';

const DoctorHospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const doctorId = sessionStorage.getItem("pateintId");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const doctorId = sessionStorage.getItem("pateintId");
        const response = await getHospitalsWhereDoctorIsNotWorkingByDoctorId(doctorId);
        setHospitals(response.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleHospitalChange = (event) => {
    setSelectedHospital(event.target.value);
  };

  const handleProvideService = async () => {
    if (selectedHospital) {
      try {
        const resp = await addDoctorToHospital(selectedHospital, doctorId);
        toast.success(`Successfully added to hospital ID: ${selectedHospital}`);
        console.log(`Providing service for hospital ID: ${selectedHospital}`);
      } catch (error) {
        toast.error('Error providing service');
        console.error('Error providing service:', error);
      }
    } else {
      toast.error('No hospital selected');
      console.error('No hospital selected');
    }
  };

  return (
    <div className="flex flex-col bg-gray-100">
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <DoctorSideBar />
        <div className="flex-1 p-5 overflow-y-auto">
          <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
            <div>
              <span className="text-gray-600">Select Hospital</span>
            </div>
          </header>
          <div className="mt-5">
            <select
              value={selectedHospital}
              onChange={handleHospitalChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value=''>Select Hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleProvideService}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Provide Service
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default DoctorHospital;