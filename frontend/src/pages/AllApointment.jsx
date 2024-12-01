import React from "react";
import "./AllAppointment.css";
import { assets } from "../assets/assets";

const AllAppointment = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          {/* <img src={assets.logo1} alt="Prescripto Logo" className="logo" /> */}
          <h1 className="logo-text">Buddy HealthCare</h1>
          <span className="dashboard-label">Dashboard Panel</span>
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <i className="icon-home"></i> Dashboard
            </li>
            <li>
              <i className="icon-calendar"></i> Appointments
            </li>
            <li>
              <i className="icon-add"></i> Add Doctor
            </li>
            <li>
              <i className="icon-doctor"></i> Doctors List
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="top-bar">
          <div className="admin-info">
            <span className="admin-label">Admin</span>
          </div>
          <button className="logout-button">Logout</button>
        </header>

        {/* Dashboard Stats */}
        <section className="dashboard-stats">
          <div className="stat-card">
            <h3>15</h3>
            <p>Doctors</p>
          </div>
          <div className="stat-card">
            <h3>5</h3>
            <p>Appointments</p>
          </div>
          <div className="stat-card">
            <h3>3</h3>
            <p>Patients</p>
          </div>
        </section>

        {/* Latest Bookings */}
        <section className="latest-bookings">
          <h2>Latest Bookings</h2>
          <div className="bookings-list">
            <div className="booking-item">
              <p>Dr. Richard James</p>
              <p>Booking on 26 Sep 2024</p>
              <span className="status cancelled">Cancelled</span>
            </div>
            <div className="booking-item">
              <p>Dr. Christopher Davis</p>
              <p>Booking on 23 Sep 2024</p>
              <span className="status cancelled">Cancelled</span>
            </div>
            <div className="booking-item">
              <p>Dr. Richard James</p>
              <p>Booking on 25 Sep 2024</p>
              <span className="status completed">Completed</span>
            </div>
            <div className="booking-item">
              <p>Dr. Richard James</p>
              <p>Booking on 24 Sep 2024</p>
              <span className="status completed">Completed</span>
            </div>
            <div className="booking-item">
              <p>Dr. Emily Larson</p>
              <p>Booking on 22 Sep 2024</p>
              <span className="status completed">Completed</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllAppointment;
