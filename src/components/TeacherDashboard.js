import React from 'react';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  return (
    <div className="teacher-dashboard-container">
      <h2>Karibu Mwalimu 👨‍🏫</h2>

      <div className="dashboard-sections">
        <div className="dashboard-card">
          <h3>Mafunzo</h3>
          <p>Angalia au ongeza mafunzo unayofundisha.</p>
          {/* Baadaye unaweza weka button ya kuenda lessons */}
        </div>

        <div className="dashboard-card">
          <h3>Mitihani</h3>
          <p>Angalia au tengeneza mitihani kwa wanafunzi wako.</p>
        </div>

        <div className="dashboard-card">
          <h3>Matokeo</h3>
          <p>Weka au hakiki matokeo ya wanafunzi.</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
