import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { getAllDoctorByHospitalId } from '../service/health'
import { assets } from '../assets/assets'

const Doctors = () => {

  const {hospId}=useParams()
  
  const[filterDoc,setFilterDoc] = useState([])
  const navigate = useNavigate()
  const{doctors} = useContext(AppContext)

  const getAllDoctorData = async () => {
    try {
        console.log(`SELECTED HOSPITAL ${hospId}`);
        const response = await getAllDoctorByHospitalId(hospId);
        setFilterDoc(response.data);
    } catch (error) {
        console.log(error);
        }
    }
  useEffect(()=>{
    getAllDoctorData()
  },[])
  return (
    
      <div>
        <h2 className='text=3xl md:text-4xl lg:text-5xl text-black font-semibold leading-tight md:leading-tightss'>All Doctors</h2>
      <div className='w-3/6 grid grid-cols-auto gap-4 gay-y-6 mt-10 place-self-center'>
        {
          filterDoc.map((item,index)=>(
            <div onClick={()=>navigate(`/appointment/${item.id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duratio-500' key={index}>
                <img className='bg-blue-50'src={assets.doctor_img} alt="" />
                <div className='p-4'>
                    {/* <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                        <p>Avaiable</p>
                    </div> */}
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='tetx-gray-600 tetx-sm'>{item.speciality}</p>
                        <p className='tetx-gray-600 tetx-sm'>Year of Experience : {item.experience}</p>
                        <p className='tetx-gray-600 tetx-sm'>{item.email}</p>
                </div>
                
            </div>
        ))
        }
      </div>
      </div>
  )
}

export default Doctors
