import React, { useState, useEffect } from "react";
import AdminSideBar from '../components/AdminSideBar';
import { getAllAppointment } from "../service/health";

const AllAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [pending,setPending]=useState(0);
  const [completed,setCompleted]=useState(0);
  const [cancelled,setCancelled]=useState(0);
  const [countAppointment, setAppointmentCount] = useState(0);

  useEffect(() => {
    const fetchAppointment = async () => {
      const response = await getAllAppointment();
      setAppointments(response.data);
      setAppointmentCount(response.data.length);
      setPending(response.data.filter(appointment=>appointment.status==='PENDING').length);
      setCompleted(response.data.filter(appointment=>appointment.status==='COMPLETED').length);
      setCancelled(response.data.filter(appointment=>appointment.status==='CANCELLED').length);
      console.log(response.data);
    };
    fetchAppointment();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <AdminSideBar />

        {/* Main Content */}
        <div className="flex-1 p-5 overflow-y-auto">
          <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
            <div>
              <span className="text-gray-600">All Appointment</span>
            </div>
          </header>

          {/* Dashboard Stats */}
          <section className="grid grid-cols-4 gap-5 my-5">
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{countAppointment}</h3>
              <p className="text-gray-600">Total Appointments</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{pending}</h3>
              <p className="text-yellow-600">Pending</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{cancelled}</h3>
              <p className="text-red-600">Cancelled</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{completed}</h3>
              <p className="text-green-600">Completed</p>
            </div>
          </section>

          {/* Latest Bookings */}
          <section className="bg-white p-5 border border-gray-200 rounded-md">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left text-gray-600 font-medium">Hospital Name</th>
                    <th className="border px-4 py-2 text-left text-gray-600 font-medium">Doctor Name</th>
                    <th className="border px-4 py-2 text-left text-gray-600 font-medium">Patient Name</th>
                    <th className="border px-4 py-2 text-left text-gray-600 font-medium">Time</th>
                    <th className="border px-4 py-2 text-left text-gray-600 font-medium">Date</th>
                    <th className="border px-4 py-2 text-left text-gray-600 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((booking, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{booking.hospitalName}</td>
                      <td className="border px-4 py-2">{booking.doctorName}</td>
                      <td className="border px-4 py-2">{booking.patientName}</td>
                      <td className="border px-4 py-2">{booking.startTime}</td>
                      <td className="border px-4 py-2">{booking.appointmentDate}</td>
                      <td className={`border px-4 py-2 ${booking.status === 'PENDING' ? 'text-yellow-500' : booking.status === 'COMPLETED' ? 'text-green-500' : 'text-red-500'}`}>
                        {booking.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AllAppointment;