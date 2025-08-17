import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('registrationNumber');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Menu</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="" end className={({ isActive }) => (isActive ? 'active' : '')}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="teachers" className={({ isActive }) => (isActive ? 'active' : '')}>
                Walimu
              </NavLink>
            </li>
            <li>
              <NavLink to="lessons" className={({ isActive }) => (isActive ? 'active' : '')}>
                Mafunzo
              </NavLink>
            </li>
            <li>
              <NavLink to="assessments" className={({ isActive }) => (isActive ? 'active' : '')}>
                Mitihani
              </NavLink>
            </li>
            <li>
              <NavLink to="results" className={({ isActive }) => (isActive ? 'active' : '')}>
                Matokeo
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Toka
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
