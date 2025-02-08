import React, { useState, useEffect } from "react";
import { getAllAppointmentByDoctorId, patchCompletedAppointmentById, patchCanceledAppointmentById } from "../service/health";
import DoctorSideBar from "../components/DoctorSideBar";

const DoctorAppointment = () => {
  const doctorId = sessionStorage.getItem("pateintId"); 
  const [totalAppointments, setTotalApp] = useState(0);
  const [pendingAppointments, setPendingApp] = useState(0);
  const [completedAppointments, setCompletedApp] = useState(0);
  const [cancelledAppointments, setCancelledApp] = useState(0);
  const [appointments, setAppointments] = useState([]);

  const getDoctorAppointment = async () => {
    if (!doctorId) {
      console.error("Doctor ID is null. Please check if it is correctly set in sessionStorage.");
      return;
    }

    try {
      const response = await getAllAppointmentByDoctorId(doctorId);
      setAppointments(response.data);
      console.log(response.data.length);
      setTotalApp(response.data.length);
      setPendingApp(response.data.filter((appointment) => appointment.status === "PENDING").length);
      setCompletedApp(response.data.filter((appointment) => appointment.status === "COMPLETED").length);
      setCancelledApp(response.data.filter((appointment) => appointment.status === "CANCELLED").length);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const handleComplete = async (appointmentId) => {
    try {
      await patchCompletedAppointmentById(appointmentId);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status: "COMPLETED" } : appointment
        )
      );
      setCompletedApp(completedAppointments + 1);
      setPendingApp(pendingAppointments - 1);
    } catch (error) {
      console.error("Error while updating appointment status:", error);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await patchCanceledAppointmentById(appointmentId);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status: "CANCELLED" } : appointment
        )
      );
      setCancelledApp(cancelledAppointments + 1);
      setPendingApp(pendingAppointments - 1);
    } catch (error) {
      console.error("Error while updating appointment status:", error);
    }
  };

  useEffect(() => {
    getDoctorAppointment();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <DoctorSideBar /> 

        <div className="flex-1 p-5 overflow-y-auto">
          <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
            <div>
              <span className="text-gray-600">Doctor Appointments</span>
            </div>
          </header>

          <section className="grid grid-cols-4 gap-5 my-5">
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{totalAppointments}</h3>
              <p className="text-gray-600">Appointments</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{pendingAppointments}</h3>
              <p className="text-yellow-600">Pending Appointments</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{completedAppointments}</h3>
              <p className="text-green-600">Completed Appointments</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{cancelledAppointments}</h3>
              <p className="text-red-600">Cancelled Appointments</p>
            </div>
          </section>

          <section className="bg-white p-5 border border-gray-200 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Latest Bookings</h2>
            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-4 gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{appointment.patientName}</p>
                    <p className="text-gray-600">
                      Booking on {new Date(appointment.appointmentDate).toLocaleDateString()} |{" "}
                      {appointment.startTime}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className={`text-sm text-center sm:min-w-48 py-2 ${appointment.status === 'PENDING' ? 'text-yellow-500' : appointment.status === 'COMPLETED' ? 'text-green-500' : 'text-red-500'}`}>
                      {appointment.status}
                    </p>

                    {appointment.status === 'PENDING' && (
                      <>
                        <button onClick={() => handleComplete(appointment.id)} className='text-sm text-neutral-500 text-center sm:min-w-48 py-2 border hover:bg-green-600 hover:text-white transition-all duration-300'>
                          Complete Appointment
                        </button>
                        <button onClick={() => handleCancel(appointment.id)} className='text-sm text-neutral-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300'>
                          Cancel Appointment
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;