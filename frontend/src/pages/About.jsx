import React from "react";
//import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported if not already done in App.js

import aboutImage from "../assets/about_image.png"; // Import the image from the assets folder

const About = () => {
  return (
    <div className="container my-5">
      {/* Heading Section */}
      <h1 className="text-center mb-4">About Us</h1>

      {/* Content Section */}
      <div className="row">
        {/* Image Section */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src={aboutImage} // Use the imported image variable
            alt="About Us"
            className="img-fluid rounded" // Bootstrap class to make it responsive
          />
        </div>

        {/* Text Section */}
        <div className="col-md-6">
          <p>
            Welcome to our website, your trusted partner in managing your healthcare
            needs. We understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records. Our platform
            is designed to make healthcare more accessible and convenient for everyone.
          </p>
          <p>
            Our goal is to provide an easy and efficient way for patients to book
            appointments with trusted healthcare professionals, track their health records,
            and receive reminders for their healthcare needs. We continuously strive to enhance
            our platform, integrating the latest advancements in technology to ensure you
            receive the best possible service.
          </p>
          <h2 className="mt-4">Our Mission</h2>
          <p>
            Our mission is to improve healthcare accessibility and user experience by
            bridging the gap between patients and healthcare providers. We aim to make
            healthcare management more efficient, personalized, and convenient for everyone.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-5">
        <h2 className="text-center mb-4">Why Choose Us</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h3>Convenience</h3>
              <p>Easy and fast access to healthcare professionals near you.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h3>Efficiency</h3>
              <p>Seamless scheduling and reminders to keep you on track with your health.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h3>Personalization</h3>
              <p>Tailored healthcare solutions to meet your individual needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
