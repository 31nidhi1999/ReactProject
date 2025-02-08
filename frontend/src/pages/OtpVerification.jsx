import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../service/health";
import "./OtpVerification.css";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const newOtp = [...otp];

  const [otpbody, setOtp1] = useState({
    email: '',
    otp: ''
  });

  const handleChange = async (index, event) => {
    const value = event.target.value;
    if (/^\d?$/.test(value)) {
      
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }

    // Join all the OTP input fields
    const otpValue = newOtp.join("");
    if (otpValue.length === 6) {
      setOtp1({
        email: sessionStorage.getItem('email'),
        otp: otpValue,
      });

      try {
        const response = await verifyOtp({
          email: sessionStorage.getItem('email'),
          otp: otpValue,
        }, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 202) {
          navigate("/login");
        } 
      } catch (error) {
        console.error("OTP verification failed", error);
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div className="otp-container">
      <h2 className="otp-heading">Enter your OTP here:</h2>
      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            value={digit}
            maxLength="1"
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            className="otp-box"
          />
        ))}
      </div>
      <p className="resend-text">
        Didn't receive OTP?{" "}
        <span className="resend-link" onClick={() => navigate("/otp")}>
          Resend OTP
        </span>
      </p>
    </div>
  );
};

export default OtpVerification;