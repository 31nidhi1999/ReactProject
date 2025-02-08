import React, { useState, useEffect } from 'react';
import {getHospitalsByDoctorId,removeDoctorFromHospital} from '../service/health.jsx';
import DoctorSideBar from '../components/DoctorSideBar.jsx';
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
    <div className="flex flex-col bg-gray-100">
    {/* Main Layout */}
    <div className="flex flex-1">
      {/* Sidebar */}
      <DoctorSideBar  />
      <div className="flex-1 p-5 overflow-y-auto">
          <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
            <div>
              <span className="text-gray-600">Doctor Hospital List</span>
            </div>
           
          </header>
          <div className="bg-white p-5 border border-gray-200 rounded-md mt-5">
         
            <div className="space-y-4"></div>
            <ul className="w-full">
              {hospitals.map((hospital) => (
                <li key={hospital.id} className="flex justify-between items-center border-b pb-4 gap-4 py-4">
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
    </div>
    </div>
    </div>
  );
};

export default HospitalList;