
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import './Auth.css'; // Import the CSS file for styling

const Create = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      // Redirect to home page if the user is already logged in
      navigate('/home');
    }
  }, [auth, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@tec\.rjt\.ac\.lk$/;
    if (!emailRegex.test(email)) {
      setError('Email should be in the format: example@tec.rjt.ac.lk');
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered successfully');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
