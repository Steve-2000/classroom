import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import './Auth.css'; // Import the CSS file for styling
import Home from "./Home";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const Loginsubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email before attempting to sign in
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate('/home');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Log In</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={Loginsubmit}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder="Your email address"
              tabIndex={0}
              name="email"
              value={email}

              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Your password"
              name="password"
              tabIndex={1}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-button" tabIndex={2}>Log In</button>
        </form>
        <Link to="/create-account" className="auth-link" tabIndex={3}>Don't have an account? Create Here</Link>
      </div>
    </div>
  );
};

export default Login;
