import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [stats, setStats] = useState({
    lessonsCount: 0,
    examsCount: 0,
    resultsCount: 0,
  });

  // check if logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || user.role !== 'TEACHER' || !token) {
      navigate('/teacher-login');
      return;
    }

    setTeacher(user);

    // fetch teacher stats
    const fetchStats = async () => {
      try {
        const resLessons = await axios.get(
          `http://192.168.43.33:8080/api/teachers/${user.id}/lessons`
        );
        const resExams = await axios.get(
          `http://192.168.43.33:8080/api/teachers/${user.id}/assessments`
        );
        const resResults = await axios.get(
          `http://192.168.43.33:8080/api/teachers/${user.id}/results`
        );

        setStats({
          lessonsCount: resLessons.data.length,
          examsCount: resExams.data.length,
          resultsCount: resResults.data.length,
        });
      } catch (err) {
        console.error('Error fetching teacher stats:', err);
      }
    };

    fetchStats();
  }, [navigate]);

  if (!teacher) return <p>Inapakia data ya mwalimu...</p>;

  return (
    <div className="teacher-dashboard-container">
      <h2>Karibu, {teacher.fullName} 👨‍🏫</h2>

      <div className="dashboard-sections">
        <div className="dashboard-card" onClick={() => navigate('/teacher-dashboard/lessons')}>
          <h3>Mafunzo</h3>
          <p>Angalia au ongeza mafunzo unayofundisha.</p>
          <p>Jumla ya Mafunzo: {stats.lessonsCount}</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/teacher-dashboard/exams')}>
          <h3>Mitihani</h3>
          <p>Angalia au tengeneza mitihani kwa wanafunzi wako.</p>
          <p>Jumla ya Mitihani: {stats.examsCount}</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/teacher-dashboard/results')}>
          <h3>Matokeo</h3>
          <p>Weka au hakiki matokeo ya wanafunzi.</p>
          <p>Jumla ya Matokeo: {stats.resultsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
