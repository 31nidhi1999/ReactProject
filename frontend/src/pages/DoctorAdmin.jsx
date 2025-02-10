import React, { useEffect, useState } from "react";
import { getAllActiveHospitals, getAllDoctor } from "../service/health";
import PatientSideBar from "../components/PatientSideBar";
import AdminSideBar from "../components/AdminSideBar";

const DoctorAdmin = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [countDoctor, setDoctorCount] = useState(0);
  const[active,setActive]=useState(0);
  const[inactive,setInactive]=useState(0);

  useEffect(() => {
    const fetchDoctorList = async () => {
      const response = await getAllDoctor();
      //const resp = await getAllActiveHospitals();
      setDoctorList(response.data);
      setDoctorCount(response.data.length);
      setActive(response.data.filter(doctor=>doctor.isActive===true).length);
      setInactive(response.data.filter(doctor=>doctor.isActive===false).length);
      console.log(response.data);
    };
    fetchDoctorList();
  }, []);

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex flex-1">
            <AdminSideBar />
          <div className="flex-1 p-5 overflow-y-auto">
            <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
              <div>
                <span className="text-gray-600">All Doctors</span>
              </div>
            </header>
            <section className="grid grid-cols-3 gap-5 my-5">
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{countDoctor}</h3>
              <p className="text-gray-600">Total Doctor</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{active}</h3>
              <p className="text-green-600">Active Doctor</p>
            </div>
            <div className="bg-white p-5 text-center border border-gray-200 rounded-md">
              <h3 className="text-2xl mb-2">{inactive}</h3>
              <p className="text-red-600">Inactive Doctor</p>
            </div>
          </section>

            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md mt-5">
                <thead>
                    <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left text-gray-600 font-medium">Doctor Name</th>
                    <th className="border px-4 py-2 text-left text-gray-600 font-medium">Specialization</th>
                   
                    <th className="border px-4 py-2 text-left text-gray-600 font-medium">Email</th>
                    <th className="border px-4 py-2 text-left text-gray-600 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {doctorList.map((doctor) => (
                    <tr key={doctor.id}>
                        <td className="border px-4 py-2 text-gray-600 font-medium">{doctor.name}</td>
                        <td className="border px-4 py-2 text-gray-600 font-medium">{doctor.specialization}</td>
                    
                        <td className="border px-4 py-2 text-gray-600 font-medium">{doctor.email}</td>
                        {
                          doctor.isActive===true?
                          <td className="border px-4 py-2 text-green-600 font-medium">Active</td>:
                          <td className="border px-4 py-2 text-red-600 font-medium">Inactive</td>
                        }
                    </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAdmin;