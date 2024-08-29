



// src/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar2.css';

import LogoutButton from './LogoutButton'
function Navbar2({handleLogout}) {
  return (
    <nav className="navbar">
      <div className="logo"></div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/contact">Contact   </Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/logout"><button onClick={handleLogout}>logout</button></Link></li>
      </ul>
    </nav>
  );
}

export default Navbar2;
