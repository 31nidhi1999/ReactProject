import React from 'react'
import "./login.css";
const Login = () => {
  return (
    <div className="login-container">
      <h2>
        <span className="blueviolet">Login</span> 
      </h2>
      <form className='form'>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
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
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
