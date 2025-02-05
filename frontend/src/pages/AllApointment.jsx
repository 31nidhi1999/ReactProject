import React from "react";

const AllAppointment = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-5">
          <div className="text-center mb-5">
            <h1 className="text-lg font-bold text-gray-800">Buddy HealthCare</h1>
            <span className="text-sm text-gray-500">Dashboard Panel</span>
          </div>
          <nav className="space-y-4">
            <ul className="list-none p-0">
              <li className="text-gray-700 flex items-center gap-2 cursor-pointer">
                <i className="icon-home"></i> Dashboard
              </li>
              <li className="text-gray-700 flex items-center gap-2 cursor-pointer">
                <i className="icon-calendar"></i> Appointments
              </li>
              <li className="text-gray-700 flex items-center gap-2 cursor-pointer">
                <i className="icon-add"></i> Add Doctor
              </li>
              <li className="text-gray-700 flex items-center gap-2 cursor-pointer">
                <i className="icon-doctor"></i> Doctors List
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-5 overflow-y-auto">
          <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
            <div>
              <span className="text-gray-600">Admin</span>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">
              Logout
            </button>
          </header>

          {/* Dashboard Stats */}
          <section className="grid grid-cols-3 gap-5 my-5">
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">15</h3>
              <p className="text-gray-600">Doctors</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">5</h3>
              <p className="text-gray-600">Appointments</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">3</h3>
              <p className="text-gray-600">Patients</p>
            </div>
          </section>

          {/* Latest Bookings */}
          <section className="bg-white p-5 border border-gray-200 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Latest Bookings</h2>
            <div className="space-y-4">
              {[
                { name: "Dr. Richard James", date: "26 Sep 2024" },
                { name: "Dr. Christopher Davis", date: "23 Sep 2024" },
                { name: "Dr. Richard James", date: "25 Sep 2024" },
                { name: "Dr. Emily Larson", date: "22 Sep 2024" },
              ].map((booking, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-4 gap-4"
                >
                  {/* Doctor Details */}
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{booking.name}</p>
                    <p className="text-gray-600">Booking on {booking.date}</p>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col items-end gap-2">
                    {/* Status */}
                    <p className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border border-gray-300 bg-gray-50">
                      Pending
                    </p>

                    {/* Update Button */}
                    <button className="text-sm text-green-500 text-center sm:min-w-48 py-2 border border-green-300 hover:bg-green-500 hover:text-white transition-all duration-300">
                      Update Status
                    </button>

                    {/* Cancel Button */}
                    <button className="text-sm text-red-500 text-center sm:min-w-48 py-2 border border-red-300 hover:bg-red-500 hover:text-white transition-all duration-300">
                      Cancel Appointment
                    </button>
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

export default AllAppointment;
