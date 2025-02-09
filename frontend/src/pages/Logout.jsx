import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Logout = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Logging out user:", userId);
    
    if (userId) {
      sessionStorage.clear();
      navigate('/login', { replace: true }); // Prevents going back to the logout page
    }
  }, [userId, navigate]); // Include userId to ensure it runs correctly

  return null;
};

export default Logout;
