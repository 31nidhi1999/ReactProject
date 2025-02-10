import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyOtp, VerifyEmail, sendOtp } from '../service/health';
import './otpcss.css';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleEmailVerification = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Valid email is required.');
      return;
    }

    try {
      const response = await VerifyEmail(email);
      console.log("Response:", response);

      if (response.status === 204) {
        // User exists, send OTP
        try {
          const resp = await sendOtp(
            { email, otp: "" },
            { headers: { "Content-Type": "application/json" } }
          );
          alert("OTP sent");
          setIsEmailVerified(true);
          
        } catch (otpError) {
          toast.error("Error while sending OTP");
          console.error("Error while sending OTP:", otpError);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // User does not exist, navigate to register page
        navigate("/verify");
      } else {
        toast.error("Unexpected error during email verification");
        console.error("Error while verifying email:", error);
      }
    }
  };

  const handleChange = async (index, event) => {
    const value = event.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp]; // Copy the existing OTP array
      newOtp[index] = value;   // Update the specific digit

      // Compute the OTP value BEFORE updating the state
      const otpValue = newOtp.join("");

      setOtp(newOtp); // Update state asynchronously

      // Move focus to the next input field
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }

      // Only trigger API call when OTP is fully entered
      if (otpValue.length === 6) {
        console.log("OTP entered:", otpValue); // Debugging log
        
        try {
          
          const response = await verifyOtp(
            {

              email,
              otp: otpValue, // Send the OTP as a string
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          
          console.log("Verify OTP response:", response); // Debugging log

          if (response.status === 202) {
            navigate('/setpassword')
            sessionStorage.setItem('email',email)
          } else {
            toast.error("Invalid OTP. Please try again.");
          }
        } catch (error) {
          toast.error("OTP verification failed. Please try again.");
          console.error("OTP verification failed:", error);
        }
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex justify-center items-center bg-white py-2">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Verify Email</h2>
        <form className="space-y-6">
          {error && <div className="alert bg-red-100 text-red-700 p-3 rounded">{error}</div>}

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
            <button
              type="button"
              className="btn btn-primary w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-2"
              onClick={handleEmailVerification}
            >
              Verify Email
            </button>
          </div>

          {isEmailVerified && (
            <div>
              <label htmlFor="otp" className="block text-gray-700 font-medium">OTP</label>
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
            </div>
          )}
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgetPassword;