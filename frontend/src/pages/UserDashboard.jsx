import React, { useState } from "react";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

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
    <div className="dashboard-container">
      <h2 className="dashboard-title">User Dashboard</h2>
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <label className="dashboard-label">
          Name:
          <input
            type="text"
            name="name"
            required
            value={profile.name}
            onChange={handleChange}
            className="dashboard-input"
          />
        </label>
        <label className="dashboard-label">
          Age:
          <input
            type="number"
            name="age"
            required
            value={profile.age}
            onChange={handleChange}
            className="dashboard-input"
          />
        </label>
        <label className="dashboard-label">
          Email ID:
          <input
            type="email"
            name="email"
            required
            value={profile.email}
            onChange={handleChange}
            className="dashboard-input"
          />
        </label>
        <label className="dashboard-label">
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="dashboard-input"
            required
          />
        </label>
        <div className="dashboard-buttons">
          <button type="submit" className="save-button">
            Save
          </button>
          <button type="submit" className="update-button">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDashboard;
