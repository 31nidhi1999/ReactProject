import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const AdminSideBar = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('pateintId');
  return (
    <aside className="w-70 bg-white border-r border-gray-200 p-5">
       <div className="text-center mb-5">
              {/* <h1 className="text-lg font-bold text-gray-800">WELCOME</h1> */}
              <img src={assets.logo1}></img>
              <span className="text-sm text-gray-500">Admin Panel</span>
            </div>
      <nav className="space-y-4">
        <ul className="list-none p-0">
          {/* <li className="text-xl text-gray-700 flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100">
            <i className="icon-home"></i> Dashboard
          </li> */}
          <li className="text-xl text-gray-700 flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100">
  
            <button onClick={()=>navigate(`/admin`)} className="flex-1">Appointments</button>

          </li>
          <li className="text-xl text-gray-700 flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100">
            <i className="icon-add"></i> 
            
            <button onClick={()=>navigate(`/addhospital`)} className="flex-1">Register Hospital</button>
          </li>
          <li className="text-xl text-gray-700 flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100">
           
            
            <button onClick={()=>navigate(`/hospital-list-admin`)} className="flex-1">Hospital List</button>
          </li>
          <li className="text-xl text-gray-700 flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100">
            <button onClick={()=>navigate(`/doctorlist`)} className="flex-1">Doctor List</button>

          </li>
          {/* <li className="text-xl text-gray-700 flex items-center gap-4 p-4 cursor-pointer hover:bg-red-100 hover:bg-gray-100 rounded-md transition duration-200">
            <button onClick={()=>navigate(`/logout/${userId}`)} className="flex-1">Logout</button>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSideBar;