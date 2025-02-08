import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Logout = () => {
  const{userId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userId);
   if(userId){
     sessionStorage.removeItem('token');
     sessionStorage.removeItem('pateintId');
     navigate('/login');
   }
  }, [navigate]);

  return null;
}

export default Logout;