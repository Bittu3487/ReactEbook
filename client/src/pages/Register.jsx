// client/src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", { username, password }, { withCredentials: true });
      if (response.data.user) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="auth-container register-bg">
      <div className="auth-box">
        {/* Close Button */}
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>

        <h2 className="auth-title">Register for eBook Finder</h2>
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-button">Register</button>
        </form>
        <div className="google-signin mt-3">
          <div className="card">
            <div className="card-body text-center">
              <a className="btn btn-block btn-outline-dark" href="http://localhost:5000/auth/google" role="button">
                <i className="fab fa-google me-2"></i>
                Sign Up with Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
