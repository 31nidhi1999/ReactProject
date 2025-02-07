import React, { useState, useEffect } from "react";
import { getAllAppointmentByDoctorId, patchCompletedAppointmentById, patchCanceledAppointmentById } from "../service/health";
import { Link, useNavigate } from "react-router-dom";

const DoctorAppointment = () => {
  const doctorId = sessionStorage.getItem("pateintId"); // ✅ Fixed typo
  console.log("Retrieved doctorId from sessionStorage:", doctorId); // Debugging line

  const [appointments, setAppointments] = useState([]);

  const getDoctorAppointment = async () => {
    if (!doctorId) {
      console.error("Doctor ID is null. Please check if it is correctly set in sessionStorage.");
      return;
    }

    try {
      const response = await getAllAppointmentByDoctorId(doctorId);
      setAppointments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const handleComplete = async (appointmentId) => {
    try {
      await patchCanceledAppointmentById(appointmentId);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status: "COMPLETED" } : appointment
        )
      );
    } catch (error) {
      console.error("Error while updating appointment status:", error);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await patchCancelledAppointmentById(appointmentId);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status: "CANCELLED" } : appointment
        )
      );
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
        <aside className="w-64 bg-white border-r border-gray-200 p-5">
          <div className="text-center mb-5">
            <h1 className="text-lg font-bold text-gray-800">Buddy HealthCare</h1>
            <span className="text-sm text-gray-500">Dashboard Panel</span>
          </div>
          <nav className="space-y-4">
            <ul className="list-none p-0">
              <li className="text-gray-700 flex items-center gap-2 cursor-pointer">
                <Link to="/doctor-profile">Doctor Profile</Link>
              </li>
              <li className="text-gray-700 flex items-center gap-2 cursor-pointer">Appointments</li>
              <li className="text-gray-700 flex items-center gap-2 cursor-pointer">
                <Link to="/doctorinhospital">Select Hospital</Link>
              </li>
              <li className="text-gray-700 flex items-center gap-2 cursor-pointer">
                <Link to="/hospitallist">Hospital List</Link>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="flex-1 p-5 overflow-y-auto">
          <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
            <div>
              <span className="text-gray-600">Doctor</span>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">
              <Link to="/logout">Logout</Link>
            </button>
          </header>

          <section className="grid grid-cols-3 gap-5 my-5">
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{appointments.length}</h3>
              <p className="text-gray-600">Appointments</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">
                {appointments.filter((app) => app.status === "Pending").length}
              </h3>
              <p className="text-gray-600">Pending Appointments</p>
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