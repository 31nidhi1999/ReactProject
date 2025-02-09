import React from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { assets } from '../assets/assets';

const PatientSideBar = () => {
    const navigate = useNavigate();
    const {docId} = useParams();
    const userId = sessionStorage.getItem('pateintId');
  return (
    <aside className="w-70 bg-white border-r border-gray-200 p-5">
      <div className="text-center mb-5">
        {/* <h1 className="text-lg font-bold text-gray-800">WELCOME</h1> */}
        <img src={assets.logo1}></img>
        <span className="text-sm text-gray-500">Patient Panel</span>
      </div>
      <nav className="space-y-4">
        <ul className="list-none p-0">
          <li className="text-xl text-gray-700 flex items-center gap-5 cursor-pointer hover:bg-gray-100 p-4 rounded-md transition duration-200">
            <button onClick={()=>navigate(`/userdashboard`)}className="flex-1">Patient Profile</button>
          </li>
          <li className="text-xl text-gray-700 flex items-center gap-5 cursor-pointer hover:bg-gray-100 p-4 rounded-md transition duration-200">
            <button onClick={()=>navigate(`/my-appointments`)} className="flex-1">Appointment History</button>
          </li>
          {/* <li className="text-xl text-gray-700 flex items-center gap-5 cursor-pointer hover:bg-gray-100 p-4 rounded-md transition duration-200">
            <button onClick={()=>navigate(`/appointment/${docId}`)} className="flex-1">Book Appointment</button>
          </li> */}
          {/* <li className="text-xl text-gray-700 flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition duration-200">
            <Link to="/doctorinhospital" className="flex-1">Select Hospital</Link>
          </li>
          <li className="text-xl text-gray-700 flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition duration-200">
            <Link to="/hospitallist" className="flex-1">Hospital List</Link>
          </li> */}

        {/* <li className="text-xl text-gray-700 flex items-center gap-5 cursor-pointer hover:bg-red-100 p-4 rounded-md transition duration-200">
            <button onClick={()=>navigate(`/logout/${userId}`)} className="flex-1">Logout</button>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default PatientSideBar;