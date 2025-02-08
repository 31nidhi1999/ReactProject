import React, { useState, useEffect } from "react";
import { getDoctorById, updateDoctor } from "../service/health";
import DoctorSideBar from "../components/DoctorSideBar";
import { assets } from '../assets/assets';

const DoctorProfile = () => {
  const doctorId = sessionStorage.getItem("pateintId");
  const [doctor, setDoctor] = useState();
  const [doctorProfile, setDoctorProfile] = useState({
    name: '',
    specialization: '',
    experience: '',
    email: '',
    contact: '',
    password: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!doctorId) {
        console.error("Doctor ID is null. Please check if it is correctly set in sessionStorage.");
        return;
      }

      try {
        const response = await getDoctorById(doctorId);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error while fetching doctor data:", error);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  useEffect(() => {
    if (doctor) {
      setDoctorProfile({
        name: doctor.name || '',
        specialization: doctor.specialization || '',
        experience: doctor.experience || '',
        email:doctor.email || '',
        contact: doctor.contact||'',
        password: doctor.password || ''
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorProfile({
      ...doctorProfile,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    setIsModalOpen(true);
  };

  const saveChanges = async () => {
    try {
      console.log(doctorProfile);
      const response = await updateDoctor(doctorId, doctorProfile, {
        token: sessionStorage.getItem('token'),
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response.data);
      
    } catch (error) {
      console.error("Error while updating doctor data:", error);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <div className="flex flex-1">
        <DoctorSideBar />

        <div className="flex-1 p-5 overflow-y-auto">
          <section className="my-5">
            <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
              <div>
                <span className="text-gray-600">Doctor Profile</span>
              </div>
            </header>
            <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg mx-auto mt-5">
              {doctor ? (
                <div className="profile-card">
                  <img className='w-32 bg-indigo-50' src={assets.doctor_img} alt="Doctor" />
                  <div className="profile-name">{doctor.name}</div>
                  <div className="profile-info">{doctor.specialization}</div>
                  <div className="profile-info">{doctor.experience}</div>
                  <div className="profile-info">{doctor.email}</div>
                  <div className="profile-info">{doctor.contact}</div>
                  
                  <button
                    className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </button>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Modal for Update Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Update Profile</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                  value={doctorProfile.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your specialization"
                  value={doctorProfile.specialization}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Experience</label>
                <input
                  type="number"
                  name="experience"
                  className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your experience (in years)"
                  value={doctorProfile.experience}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">password</label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                </div>
                <div>
                <label className="block text-gray-600 font-medium mb-1">Contact</label>
                <input
                  type="number"
                  className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your contact"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" onClick={saveChanges}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;