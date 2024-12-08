import React from "react";
import "./AllHospitals.css";
import manipal from "../assets/manipal.png"
import kameneni from "../assets/kameneni.jpg"
import lilavati from "../assets/lilavati.jpg"
import sakra_world from "../assets/sakra_world.jpg"
import grhosp from "../assets/grhosp.webp"
import vishwanath from "../assets/vishwanath.jpeg"
import lifecare from "../assets/lifecare.jpg"
import parv from "../assets/parv.webp"
import { useNavigate } from "react-router-dom";

const hospitals = [
  { name: "Manipal Hospital", url: "#manipal", image: manipal },
  { name: "Kameneni Hospital", url: "#kameneni", image: kameneni },
  { name: "Lilavati Hospital", url: "#lilavati", image: lilavati },
  { name: "Sakra World Hospital", url: "#sakra_world", image: sakra_world },
  { name: "GR Hospital", url: "#grhosp", image: grhosp },
  { name: "Vishwanath Hospital", url: "#vishwanath", image: vishwanath },
  { name: "LifeCare Hospital", url: "#lifecare", image: lifecare },
  { name: "Parvathee Hospital", url: "#parv", image: parv },
];

const AllHospitals = () => {
  const navigate = useNavigate()
  return (
    <div className="hospital-container">
      <h1 className="hospital-header">All Hospitals</h1>
      <div className="hospital-grid">
        {hospitals.map((hospital, index) => (
          <a
            href={hospital.url}
            className="hospital-card"
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="hospital-content">
              {/* Add hospital image */}
              <img
                src={hospital.image || "https://via.placeholder.com/150"} // Placeholder image
                alt={hospital.name}
                className="hospital-image"
              />
              {/* Add hospital name */}
              <h2 className="hospital-name">{hospital.name}</h2>
              <a onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className=''>Doctors</a>
   
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AllHospitals;
