import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllAssessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://192.168.43.33:8080/api/assessments');
      setAssessments(res.data);
      setLoading(false);
    } catch (err) {
      setError('Kosa katika kupakua assessments: ' + err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Una uhakika unataka kufuta assessment hii?')) return;

    try {
      await axios.delete(`http://192.168.43.33:8080/api/assessments/${id}`);
      setAssessments(assessments.filter(a => a.id !== id));
      alert('Assessment imefutwa.');
    } catch (err) {
      alert('Kosa wakati wa kufuta: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <h2>Orodha ya Assessments Zote</h2>

      {loading && <p>Inapakia assessments...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && assessments.length === 0 && <p>Hakuna assessments zilizopo.</p>}

      {!loading && assessments.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>#</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Kichwa</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Maelezo</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Level</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Tarehe</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Vitendo</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((a, index) => (
              <tr key={a.id}>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{index + 1}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{a.title}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{a.description}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{a.level}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{a.date}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>
                  <Link
                    to={`/teacher-dashboard/view-assessment/${a.id}`}
                    style={{
                      marginRight: 8,
                      textDecoration: 'none',
                      backgroundColor: '#2196f3',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '4px'
                    }}
                  >
                    Angalia
                  </Link>
                  <Link
                    to={`/teacher-dashboard/edit-assessment/${a.id}`}
                    style={{
                      marginRight: 8,
                      textDecoration: 'none',
                      backgroundColor: '#4caf50',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '4px'
                    }}
                  >
                    Hariri
                  </Link>
                  <button
                    onClick={() => handleDelete(a.id)}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Futa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllAssessments;
