import React,{useState} from 'react'
import axios from 'axios';
import { BASE_URL } from '../constants/ApiConstants';
import { toast } from 'react-toastify';
import "./login.css";
const Login = () => {

  const [formData, setFormData] = useState({
      email: '',
      password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFields =()=>{
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#@$*]).{5,20}$/;

      if (!passwordRegex.test(formData.password)) {
        setError(
          'Password must be 5-20 characters long, contain at least one digit, one lowercase letter, one uppercase letter, and one special character (#@$*).'
        );
        return false;
      }
      return true;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }
      setError('');
      const savedData = {
        email: formData.email,
        password:formData.password
      };

      console.log(savedData);
        try{
            const response = await axios.post(`${BASE_URL}users/signin`,savedData,{ 
              headers: { 'Content-Type': 'application/json' } 
            });
            if(response.data && response.data.jwt){
              const token =response.data.jwt
              sessionStorage.setItem('pateintId',response.data.id)
              sessionStorage.setItem('token',token);
              toast("Login Succesfull")

            }
            
        }catch(error){
          toast("Login Failure")
            console.error("error while sending data :",error);
        }
      
  }

  return (
    <div className="login-container">
      <h2>
        <span className="blueviolet">Login</span> 
      </h2>
      <form className='form' onSubmit={handleSubmit} >
      {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="login-btn">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
