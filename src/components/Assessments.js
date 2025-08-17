import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Assessments.css';

const Assessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/assessments');
        setAssessments(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching assessments:', err);
        setError('Tatizo kupokea data ya mitihani');
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, []);

  if (loading) return <div className="loader">Inapakia mitihani...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="assessments-container">
      <h2 className="title">📚 Orodha ya Mitihani</h2>
      {assessments.length === 0 ? (
        <p className="no-data">Hakuna mitihani iliyopatikana</p>
      ) : (
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Kichwa cha Mtihani</th>
                <th>Somo</th>
                <th>Kiwango</th>
                <th>Mwalimu</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map(a => (
                <tr key={a.id}>
                  <td>{a.title || 'Unknown'}</td>
                  <td>{a.lessonTitle || 'Unknown'}</td>
                  <td>{a.level || 'Unknown'}</td>
                  <td>{a.teacherName || 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Assessments;
