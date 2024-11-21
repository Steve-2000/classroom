import React, { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import './Auth.css'; // Import the CSS file for styling

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
      navigate('/home'); // Redirect to the home page after successful login
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
          <button type="submit" className="auth-button">Log In</button>
        </form>
        <Link to="/create-account" className="auth-link">Don't have an account? Create Here</Link>
      </div>
    </div>
  );
};

export default Login;
