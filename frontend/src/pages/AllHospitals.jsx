import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllHospitals } from "../service/health";
import { assets } from "../assets/assets";

const AllHospitals = () => {
  const navigate = useNavigate()
  
  const [hospitals, setHospitals] = useState([]);

  const getAllHospitalsData = async () => {
    try {
        const response = await getAllHospitals();
        setHospitals(response.data);
    } catch (error) {  
        console.log(error);
        }
    }

  useEffect(() => {
    getAllHospitalsData();
      }, []);
  return (
    <div className=''>
      <h1 className='text=3xl md:text-4xl lg:text-5xl text-black font-semibold leading-tight md:leading-tightss'>All Hospitals</h1>
      <div className='w-3/6 grid grid-cols-auto gap-4 gay-y-6 mt-10 place-self-center'>
        {hospitals.map((hospital) => (

            <div onClick={()=>{navigate(`/doctors/${hospital.id}`);scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duratio-500'>
              {/* Add hospital image */}
              <img 
                src={assets.hospitals_img || "https://via.placeholder.com/150"} // Placeholder image
                alt={hospital.name}
                className='bg-blue-50'
              />
              <div className="p-4">
                {/* Add hospital name */}
              <h2 className='text-gray-900 text-xl'>{hospital.name}</h2>
              <h2 className='tetx-gray-600 text-sm'>{hospital.location}</h2>
              <h2 className='tetx-gray-600 text-sm'>{hospital.contact}</h2>
              {console.log(`Hospital ID :: ${hospital.id}`)} 
              </div>
              
            </div>
        ))}
      </div>
    </div>
  );
};

export default AllHospitals;
