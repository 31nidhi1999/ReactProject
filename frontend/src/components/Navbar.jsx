import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import primary from '../../tailwind.config'


const Navbar = () => {
  const navigate=useNavigate();
  const [showMenu, setShowMenu]=useState(false)
  const [token,setToken]=useState(true)
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-grey-400'>
      <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo1} alt="" />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'> 
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>

        <NavLink to='/allhospital'> 
            <li className='py-1'>All Hospital</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>

        {/* <NavLink to='/addhospital'> 
            <li className='py-1'>Register hospital</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink> */}

        {/* <NavLink to='/adddoctor'> 
            <li className='py-1'>Register Doctor</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        
        <NavLink to='/register'> 
            <li className='py-1'>Resgister Patient</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink> */}

        <NavLink to='/verify'> 
            <li className='py-1'>Register</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>

        <NavLink to='/login'>
            <li className='py-1'>Login</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

      

      {/* <NavLink to='/doc-appointment'>
            <li className='py-1'>Doctor Appointment</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink> */}

        {/* <NavLink to='/admin'>
            <li className='py-1'>All Apointmnet</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink> */}

        {/* <NavLink to='/hospital-list-admin'>
            <li className='py-1'>Hospital List Admin</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink> */}

        {/* <NavLink to='/doctors'>
            <li className='py-1'>All Doctors</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink> */}

        {/* <NavLink to='/userdashboard'>
            <li className='py-1'>User Dashboard</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink> */}
        <NavLink to='/about'>
            <li className='py-1'>About</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>Contact</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>
      <div className='flex item-center gap-4'>
       
      </div>
    </div>
  )
}

export default Navbar
