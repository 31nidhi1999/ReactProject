import React, { useEffect, useState } from "react";
import PatientSideBar from "../components/PatientSideBar";
import { getPatientDetail } from "../service/health";

const UserDashboard = () => {
  const patientId = sessionStorage.getItem("pateintId");
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    address: "",  
    password: "",
    gender: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = async () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Patient ID: ", patientId);
        const response = await getPatientDetail(patientId,{
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        });
        setProfile(response.data);
      console.log(response.data);
      } catch (error) {
        console.error("Error while fetching patient data:", error);
      }
    };
    fetchProfile();
  }, [patientId]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if the form is valid
    if (e.target.checkValidity()) {
      alert("Profile saved successfully!");
      console.log(profile);
    } else {
      // If form is not valid, trigger the HTML5 validation messages
      e.target.reportValidity();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <PatientSideBar />
      <div className="flex-1 p-5 overflow-y-auto">
        <section className="my-2">
          <header className="flex justify-between items-center bg-white p-4 border-b border-gray-200">
            <div>
              <span className="text-gray-600">My Profile</span>
            </div>
          </header>
          <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg mx-auto mt-5">
            {profile ? (
              <div className="profile-card">
                <div className="profile-name">{profile.firstname} {profile.lastname}</div>
                <div className="profile-info">{profile.age}</div>
                <div className="profile-info">{profile.email}</div>
                <div className="profile-info">{profile.phone}</div>
                <div className="profile-info">{profile.address}</div>
                <div className="profile-info">{profile.gender}</div>
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form className="max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">First Name:</label>
              <input
                type="text"
                name="firstname"
                required
                value={profile.firstname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Last Name:</label>
              <input
                type="text"
                name="lastname"
                required
                value={profile.lastname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Age:</label>
              <input
                type="number"
                name="age"
                required
                value={profile.age}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email ID:</label>
              <input
                type="email"
                name="email"
                required
                value={profile.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Address:</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Gender:</label>
              <input
                type="text"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-between">
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                Save
              </button>
              <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;