import React from 'react';
import { Link } from 'react-router-dom';
function Layout({ children }) {
  return (
    <div className="layout">
      <aside className="sidebar">
        <Link to="/">Past Papers</Link>
        <Link to="/study-materials">Study Materials</Link>
        <Link to="/project-samples">Project Samples</Link>
        <Link to="/current-materials">Current Study Materials</Link>
        <Link to="/upload">Upload Material</Link>
      </aside>
      <main className="content">
        {children}
      </main>
    </div>
  );
}
export default Layout;