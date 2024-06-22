// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; // Import a CSS file for styling

function Home() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <h1>Rajarata E-Learning</h1>
      <div className="flex-container">
        <div className="flex-item" onClick={() => handleNavigation('/pastpapers')}>
          <div className="overlay">
            <span>Pastpapers</span>
          </div>
        </div>
        <div className="flex-item" onClick={() => handleNavigation('/marks')}>
          <div className="overlay">
            <span>marks</span>
          </div>
        </div>
        <div className="flex-item" onClick={() => handleNavigation('/resources')}>
          <div className="overlay">
            <span>Resources</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
