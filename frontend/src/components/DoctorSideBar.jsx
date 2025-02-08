import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorSideBar = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('pateintId');
  return (
    <aside className="w-70 bg-white border-r border-gray-200 p-5">
      <div className="text-center mb-5">
        <h1 className="text-lg font-bold text-gray-800">WELCOME</h1>
        <span className="text-sm text-gray-500">Dashboard Panel</span>
      </div>
      <nav className="space-y-6"> {/* Increased space between buttons */}
        <ul className="list-none p-0">
          <li className="text-gray-700 flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-4 rounded-md transition duration-200">
            <button onClick={() => navigate(`/doctor`)} className="flex-1">Doctor Profile</button>
          </li>
          <li className="text-gray-700 flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-4 rounded-md transition duration-200">
            <button onClick={() => navigate(`/doc-appointment`)} className="flex-1">Appointments</button>
          </li>
          <li className="text-gray-700 flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-4 rounded-md transition duration-200">
            <button onClick={() => navigate(`/doctorinhospital`)} className="flex-1">Select Hospital</button>
          </li>
          <li className="text-gray-700 flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-4 rounded-md transition duration-200">
            <button onClick={() => navigate(`/hospitallist`)} className="flex-1">Hospital List</button>
          </li>
          <li className="text-gray-700 flex items-center gap-2 cursor-pointer hover:bg-red-100 p-4 rounded-md transition duration-200">
            <button onClick={() => navigate(`/logout/${userId}`)} className="flex-1">Logout</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DoctorSideBar;