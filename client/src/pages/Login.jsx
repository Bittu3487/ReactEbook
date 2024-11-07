// client/src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", { username, password }, { withCredentials: true });
      if (response.data.user) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="auth-container login-bg">
      <div className="auth-box">
        {/* Close Button */}
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>

        <h2 className="auth-title">Login to eBook Finder</h2>
        {error && <p className="text-danger">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              id="username"
              name="username"
              required
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>

        {/* Google Sign-In Button */}
        <div className="google-signin mt-3">
          <div className="card">
            <div className="card-body text-center">
              <a className="btn btn-block btn-outline-dark" href="http://localhost:5000/auth/google" role="button">
                <i className="fab fa-google me-2"></i>
                Sign In with Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
