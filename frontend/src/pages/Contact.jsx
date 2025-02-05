import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import contactImage from '../assets/contact_image.png'; // Assuming the image is in assets

const Contact = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Contact</h1>
      <div className="row">
        {/* Left Section - Image */}
        <div className="col-md-6">
          <img
            src={contactImage}
            alt="Doctor with patient"
            className="img-fluid rounded"
          />
        </div>

        {/* Right Section - Contact Information */}
        <div className="col-md-6">
          <h3>Our Office</h3>
          <p>Kharghar Station</p>
          <p>near CDAC Kharghar</p>
          <p>Tel: (415) 555-0132</p>
          <p>Email: greatstackdev@gmail.com</p>

          <div className="mt-4">
            <h4>Careers at Buddy HealthCare</h4>
            <p>Learn more about our teams and job openings.</p>
            <button className="btn btn-primary">Explore Jobs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
