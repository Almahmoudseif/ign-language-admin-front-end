// src/components/DashboardHome.js
import React, { useEffect, useState } from 'react';
import './DashboardHome.css';
import {
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaChartBar,
} from 'react-icons/fa';

const DashboardHome = () => {
  const [teacherCount, setTeacherCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/teachers/count")
      .then((res) => res.json())
      .then((data) => setTeacherCount(data))
      .catch((err) => console.error("Teacher count fetch failed:", err));
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>👋 Karibu, Admin</h1>
        <p>Muhtasari wa mfumo wa kujifunza Lugha ya Alama</p>
      </header>

      <section className="dashboard-cards">
        <div className="card">
          <FaChalkboardTeacher className="card-icon" />
          <div>
            <h3>Walimu</h3>
            <p>{teacherCount}</p>
          </div>
        </div>
        <div className="card">
          <FaBook className="card-icon" />
          <div>
            <h3>Mafunzo</h3>
            <p>15</p>
          </div>
        </div>
        <div className="card">
          <FaClipboardList className="card-icon" />
          <div>
            <h3>Mitihani</h3>
            <p>6</p>
          </div>
        </div>
        <div className="card">
          <FaChartBar className="card-icon" />
          <div>
            <h3>Matokeo</h3>
            <p>21</p>
          </div>
        </div>
      </section>

      <section className="recent-activity">
        <h2>📌 Shughuli za Hivi Karibuni</h2>
        <ul>
          <li>✅ Mwalimu Juma ameongezwa</li>
          <li>📌 Somo la “Matamshi ya A” limepakiwa</li>
          <li>📝 Jaribio jipya la Kiswahili limeundwa</li>
        </ul>
      </section>
    </div>
  );
};

export default DashboardHome;
