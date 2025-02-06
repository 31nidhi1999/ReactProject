import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoctorToHospital, getHospitalsWhereDoctorIsNotWorkingByDoctorId } from '../service/health'; // Make sure these service functions are available

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
    <div className="doctor-hospital">
      <h2>Select Hospital to Provide Service</h2>
      <select value={selectedHospital} onChange={handleHospitalChange} className='border p-2 rounded'>
        <option value=''>Select Hospital</option>
        {hospitals.map((hospital) => (
          <option key={hospital.id} value={hospital.id}>
            {hospital.name}
          </option>
        ))}
      </select>
      <button onClick={handleProvideService} className='mt-4 p-2 bg-blue-500 text-white rounded'>
        Provide Service
      </button>
      <ToastContainer />
    </div>
  );
};

export default DoctorHospital;