import React, { useEffect, useState } from 'react';
import './DashboardHome.css';
import { FaChalkboardTeacher, FaBook, FaClipboardList, FaChartBar } from 'react-icons/fa';

const DashboardHome = () => {
  const [teacherCount, setTeacherCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/teachers/count")
      .then(res => res.json())
      .then(data => setTeacherCount(typeof data === 'number' ? data : 0))
      .catch(err => console.error("Teacher count fetch failed:", err));
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>👋 Welcome, Admin</h1>
        <p>Overview of the Sign Language Learning System</p>
      </header>

      <section className="dashboard-cards">
        <div className="card">
          <FaChalkboardTeacher className="card-icon" />
          <div>
            <h3>Teachers</h3>
            <p>{teacherCount}</p>
          </div>
        </div>
        <div className="card">
          <FaBook className="card-icon" />
          <div>
            <h3>Lessons</h3>
            <p>15</p>
          </div>
        </div>
        <div className="card">
          <FaClipboardList className="card-icon" />
          <div>
            <h3>Assessments</h3>
            <p>6</p>
          </div>
        </div>
        <div className="card">
          <FaChartBar className="card-icon" />
          <div>
            <h3>Results</h3>
            <p>21</p>
          </div>
        </div>
      </section>

      <section className="recent-activity">
        <h2>📌 Recent Activity</h2>
        <ul>
          <li>✅ Teacher Juma has been added</li>
          <li>📌 Lesson “Pronunciation of A” has been uploaded</li>
          <li>📝 New Kiswahili assessment has been created</li>
        </ul>
      </section>
    </div>
  );
};

export default DashboardHome;
