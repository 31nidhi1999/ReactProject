import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

  const {speciality}=useParams()
  
  const[filterDoc,setFilterDoc] = useState([])
  const navigate = useNavigate()
  const{doctors} = useContext(AppContext)

  const applyFilter=()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
    }else{
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])
  return (
    <div className='w-full grid grid-cols-auto gap-4 gay-y-6'>
        {
          filterDoc.map((item,index)=>(
            <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duratio-500' key={index}>
                <img className='bg-blue-50'src={item.image} alt="" />
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                        <p>Avaiable</p>
                    </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='tetx-gray-600 tetx-sm'>{item.speciality}</p>
                </div>
                
            </div>
        ))
        }
      </div>
  )
}

export default Doctors
