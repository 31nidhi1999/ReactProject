import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { getPatientById, patchCanceledAppointmentById } from '../service/health';
import PatientSideBar from '../components/PatientSideBar';

const MyAppointments = () => {
  const patientid = sessionStorage.getItem('pateintId');
  console.log(patientid);
  const [appointments, setAppointments] = useState([]);
   const [totalAppointments,setTotalApp] = useState(0);
    const[pendingAppointments,setPendingApp] = useState(0);
    const[completedAppointments,setCompletedApp] = useState(0);
    const[cancelledAppointments,setCancelledApp] = useState(0);

  const handleCancel = async (appointmentId) => {
    try {
      await patchCanceledAppointmentById(appointmentId);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status: "CANCELLED" } : appointment
          )
        );
        setCancelledApp(cancelledAppointments+1);
        setPendingApp(pendingAppointments-1);
    } catch (error) {
      console.error("Error while updating appointment status:", error);
    }
  };

  const getPatientAppointment = async () => {
    try {
      const response = await getPatientById(patientid);
      setAppointments(response.data);
      setTotalApp(response.data.length);  
      setPendingApp(response.data.filter((appointment) => appointment.status === "PENDING").length);
      setCompletedApp(response.data.filter((appointment) => appointment.status === "COMPLETED").length);
      setCancelledApp(response.data.filter((appointment) => appointment.status === "CANCELLED").length);
   
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(() => {
    getPatientAppointment();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <PatientSideBar />

        {/* Main Content */}
        <div className="flex-1 p-5 overflow-y-auto">
          <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
            <div>
              <span className="text-gray-600">My Appointments</span>
            </div>
          </header>

          <section className="grid grid-cols-4 gap-5 my-5">
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{totalAppointments}</h3>
              <p className="text-gray-600">Appointments</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{pendingAppointments}</h3>
              <p className="text-yellow-600">Pending Appointment</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{completedAppointments}</h3>
              <p className="text-gren-600">Compelete Appointments</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{cancelledAppointments}</h3>
              <p className="text-red-600">Cancelled Appointments</p>
            </div>
          </section>
            <div className="bg-white w-full  p-8 rounded-lg shadow-lg mx-auto">
              <div>
                {appointments.slice(0, 10).map((item, index) => (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 border-b" key={index}>
                    <div>
                      <img className="w-32 bg-indigo-50" src={assets.doctor_img} alt="Doctor" />
                    </div>
                    <div className="flex-1 text-sm text-zinc-600">
                      <p className="text-neutral-800 font-semibold">{item.doctorName}</p>
                      <p>{item.hospitalName}</p>
                      <p className="text-xs mt-1">
                        <span className="text-sm text-neutral-700 font-medium">Date & Time:</span> {item.appointmentDate} | {item.startTime}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className={`text-sm text-center sm:min-w-48 py-2 ${item.status === 'PENDING' ? 'text-yellow-500' : item.status === 'COMPLETED' ? 'text-green-500' : 'text-red-500'}`}>
                        {item.status}
                      </p>

                      {item.status === 'PENDING' && (
                        <button onClick={() => handleCancel(item.id)} className="text-sm text-neutral-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300">
                          Cancel Appointment
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;