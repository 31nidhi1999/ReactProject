import React, { useEffect, useState } from 'react';
import AdminSideBar from '../components/AdminSideBar';
import { getAllHospitals, activateHospital, deactivateHospital } from '../service/health.jsx';

const HospitalListAdmin = () => {
  const [hospitals, setHospitals] = useState([]);
  const [countHospital, setHospitalCount] = useState(0);
  const[active,setActive]=useState(0);
  const[inactive,setInactive]=useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllHospitals();
      setHospitals(response.data);
      setHospitalCount(response.data.length);
      setActive(response.data.filter(hospital=>hospital.isActive===true).length);
      setInactive(response.data.filter(hospital=>hospital.isActive===false).length);
      console.log(response.data);
    };

    fetchData();
  }, []);

  const toggleHospitalStatus = async (hospitalId, currentStatus) => {
    if (currentStatus === 'active') {
      const response = await deactivateHospital(hospitalId);
      setActive(active-1);
      setInactive(inactive+1);

      console.log('Deactivating hospital:', hospitalId);
    } else {
      const response = await activateHospital(hospitalId);
      setActive(active+1);
      setInactive(inactive-1);
      console.log('Activating hospital:', hospitalId);

    }
    // Refetch hospitals after status change
    getAllHospitals()
      .then(response => setHospitals(response.data))
      .catch(error => console.error('Error fetching hospitals:', error));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSideBar />

        {/* Main Content */}
        <div className="flex-1 p-5 overflow-y-auto">
          <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
            <div>
              <span className="text-gray-600">All Hospitals</span>
            </div>
          </header>

          {/* Hospitals List */}
          <section className="grid grid-cols-3 gap-5 my-5">
          <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{countHospital}</h3>
              <p className="text-gray-600">Total Hospital</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{active}</h3>
              <p className="text-green-600">Active Hospital</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{inactive}</h3>
              <p className="text-red-600">Inactive Hospital</p>
            </div>
            </section>  
            <h2 className="text-xl font-semibold mb-4"></h2>
            <ul className="space-y-4">
              {hospitals.map(hospital => (
                <li key={hospital.id} className="bg-white p-5 border border-gray-200 rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <h3 className="text-2xl mb-2">{hospital.name}</h3>
                      <p className="text-gray-600 text-xl">{hospital.location}</p>
                     
                    </div>
                    <button
                      onClick={() => toggleHospitalStatus(hospital.id, hospital.isActive ? 'active' : 'inactive')}
                      className={`px-4 py-2 rounded-md ${
                        hospital.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}
                    >
                      {hospital.isActive===false ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          
        </div>
      </div>
    </div>
  );
};

export default HospitalListAdmin;