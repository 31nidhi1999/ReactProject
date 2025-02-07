import React, { useState, useEffect } from 'react';
import {getHospitalsByDoctorId,removeDoctorFromHospital} from '../service/health.jsx';
const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const doctorId = sessionStorage.getItem("pateintId");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await getHospitalsByDoctorId(doctorId);
        setHospitals(response.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, [doctorId]);

  const handleRemove = async (hospitalId) => {
    try {
        const doctorId = sessionStorage.getItem("pateintId");
      await removeDoctorFromHospital(hospitalId, doctorId);
      setHospitals((prevHospitals) =>
        prevHospitals.filter((hospital) => hospital.id !== hospitalId)
      );
    } catch (error) {
      console.error('Error removing doctor from hospital:', error);
    }
  };

  return (
    <div className="hospital-list flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Hospitals Where Doctor Works</h2>
      <ul className="w-96">
        {hospitals.map((hospital) => (
          <li key={hospital.id} className="flex justify-between items-center border-b py-2 px-4">
            <span className="flex-1">{hospital.name}</span>
            <button
              onClick={() => handleRemove(hospital.id)}
              className="text-sm text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              Discontinue Service
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalList;