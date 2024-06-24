



// src/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar2.css';


function Navbar2() {
  return (
    <nav className="navbar">
      <div className="logo">MyLogo</div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contact">Contact   </Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar2;
