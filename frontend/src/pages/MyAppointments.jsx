import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { getPatientById, patchCanceledAppointmentById } from '../service/health';

const MyAppointments = () => {
  const patientid = sessionStorage.getItem('pateintId');
  console.log(patientid);
  const [appointments, setAppointments] = useState([]);

  const handleCancel = async (appointmentId) => {
    try {
      await patchCanceledAppointmentById(appointmentId);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status: "CANCELLED" } : appointment
        )
      );
    } catch (error) {
      console.error("Error while updating appointment status:", error);
    }
  };

  const getPatientAppointment = async () => {
    try {
      const response = await getPatientById(patientid);
      setAppointments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(() => {
    getPatientAppointment();
  }, []);

  return (
    <div className='place-self-center'>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.slice(0, 10).map((item, index) => (
          <div className='grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={assets.doctor_img} alt=" " />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.doctorName}</p>
              <p>{item.hospitalName}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'> Date & Time: </span> {item.appointmentDate} | {item.startTime}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className={`text-sm text-center sm:min-w-48 py-2 ${item.status === 'PENDING' ? 'text-yellow-500' : item.status === 'COMPLETED' ? 'text-green-500' : 'text-red-500'}`}>
                {item.status}
              </p>

              {item.status === 'PENDING' && (
                <>
                  <button onClick={() => handleCancel(item.id)} className='text-sm text-neutral-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300'>
                    Cancel Appointment
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;