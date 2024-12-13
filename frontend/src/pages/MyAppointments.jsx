import React, { useContext, useEffect, useState } from 'react';
//import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { getPatientById } from '../service/health';


const MyAppointments = () => {

  const patientid = sessionStorage.getItem('pateintId');
  console.log(patientid)
  const [doctors, setDoctors] = useState([])

  const getPatientAppointment = async()=>{
        try {
            const response = await getPatientById(patientid)
            setDoctors(response.data)
            console.log(response.data)
        } catch (error) {
            console.error("error while sending data :", error);
        }
  }


    useEffect(() => {
        getPatientAppointment()
    },[])
  return(
    <div className='place-self-center'>
        <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
        <div>
            {doctors.slice(0,10).map((item,index)=>(
                <div className='grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                    <div>
                        <img className='w-32 bg-indigo-50' src ={assets.doctor_img} alt = " " >
                        </img>
                    </div>
                    <div className='flex-1 text-sm text-zinc-600'>
                        <p className='text-neutral-800 font-semibold'>{item.doctorName}</p>
                        {/* <p>{item.speciality}</p> */}
                        <p>{item.hospitalName}</p>
                        {/* <p className='text-xs'>{item.address.line2} </p>' */}
                        <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'> Date & Time: </span> {item.appointmentDate} | {item.startTime}</p>
                        </div>
                    <div></div>
                    <div className='flex-col gap-2 justify-end'>
                        <p className='text-sm text-yellow-500 text-center sm:min-w-48 py-2 font-semibold'>Pending...</p>
                        <button className='text-sm text-black-500 text-center sm:min-w-48 py-2 border hover: bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )

}
export default MyAppointments;