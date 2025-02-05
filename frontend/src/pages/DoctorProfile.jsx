import React, { useState, useEffect } from "react";
import { getDoctorById } from "../service/health";

const DoctorProfile = () => {
  const docId = 1;

  const [doctors, setDoctors] = useState(null); // Initially null instead of empty string
  const [doctorProfile, setDoctorProfile] = useState({
    name: '',
    specialization: '',
    experience: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch doctor details
  const getDoctorDetail = async () => {
    try {
      const response = await getDoctorById(docId);
      setDoctors(response.data); // Set doctors data
      console.log(response.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(() => {
    getDoctorDetail();
  }, [docId]);

  // Update doctorProfile once doctors data is fetched
  useEffect(() => {
    if (doctors) {
      setDoctorProfile({
        name: doctors.name || '',
        specialization: doctors.specialization || '',
        experience: doctors.experience || ''
      });
    }
  }, [doctors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorProfile({
      ...doctorProfile,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://as1.ftcdn.net/v2/jpg/02/90/56/38/1000_F_290563830_MCl0UobSKqqgV7wE8KeSOsablqJIUNCg.jpg"
            alt="Doctor Profile"
            className="w-24 h-24 rounded-full border-2 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{doctors?.name}</h2>
            <p className="text-gray-500">{doctors?.email}</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Specialization</h3>
            <p className="text-gray-600">{doctors?.specialization}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Experience</h3>
            <p className="text-gray-600">{doctors?.experience}</p>
          </div>
        </div>
        <button
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={handleUpdate}
        >
          Update Profile
        </button>
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
                <label className="block text-gray-600 font-medium mb-1">Location</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your location"
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
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
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
