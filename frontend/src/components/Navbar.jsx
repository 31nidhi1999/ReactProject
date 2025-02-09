import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    const userRole = sessionStorage.getItem('role');
    const id = sessionStorage.getItem('pateintId');
    if (sessionToken) {
      setToken(sessionToken);
      setRole(userRole);
      setUserId(id);
    } else {
      setToken(null);
      setRole('');
      setUserId(0);
    }
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('pateintId');
    setToken(null);
    setRole('');
    setUserId(0);
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400 px-6">
      <img onClick={() => navigate('/')} className="w-44 cursor-pointer" src={assets.logo1} alt="" />
      <ul className="flex items-center gap-5 font-medium">
        {!token && (
          <>
            <NavLink to="/">
              <li className="text-xl text-xl py-1 cursor-pointer hover:bg-gray-100">HOME</li>
            </NavLink>
            <NavLink to="/allhospital">
              <li className="text-xl py-1 cursor-pointer hover:bg-gray-100">All Hospital</li>
            </NavLink>
            <NavLink to="/verify">
              <li className="text-xl py-1 cursor-pointer hover:bg-gray-100">Register</li>
            </NavLink>
            <NavLink to="/about">
              <li className="text-xl py-1 cursor-pointer hover:bg-gray-100">About</li>
            </NavLink>
            <NavLink to="/contact">
              <li className="text-xl py-1 cursor-pointer hover:bg-gray-100">Contact</li>
            </NavLink>
          </>
        )}
        {token && role === 'ROLE_PATIENT' && (
          <>
            <NavLink to="/allhospital">
              <li className="text-xl py-1">All Hospital</li>
            </NavLink>
            <NavLink to="/my-appointments">
              <li className="text-xl py-1">My Profile</li>
            </NavLink>
          </>
        )}
      </ul>
      <div className="flex items-center gap-4 cursor-pointer hover:bg-green-100">
        {!token && (
          <ul>
            <NavLink to="/login">
            <li className="text-xl py-1">Login</li>
          </NavLink>
          </ul>
          
        )}
        {token && (
          <button onClick={handleLogout} className="text-xl py-1 bg-red-500 text-white px-4 rounded-md hover:bg-red-600">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;