import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">MyApp</Link>
        <div className="navbar-links">
          <Link to="/login" className="navbar-link">Log In</Link>
          <Link to="/create-account" className="navbar-link">Create Account</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;