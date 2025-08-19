import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Results.css';

const AdminResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/results');
      const data = response.data;

      if (Array.isArray(data)) {
        setResults(data);
      } else if (typeof data === 'object' && data !== null) {
        setResults([data]);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      alert('Error fetching student results.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this result?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/results/${id}`);
      alert('Result deleted successfully.');
      fetchResults();
    } catch (error) {
      console.error('Error deleting result:', error);
      alert('Error deleting result.');
    }
  };

  if (loading) return <p className="loading">Loading student results...</p>;

  return (
    <div className="results-container" style={{ overflowX: 'auto' }}>
      <h2 className="results-title">📊 All Student Results</h2>
      {results.length === 0 ? (
        <p className="no-data">No results found.</p>
      ) : (
        <table
          className="results-table"
          style={{
            width: '1200px',
            minWidth: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: '10px' }}>Student ID</th>
              <th style={{ padding: '10px' }}>Assessment ID</th>
              <th style={{ padding: '10px' }}>Assessment</th>
              <th style={{ padding: '10px' }}>Score</th>
              <th style={{ padding: '10px' }}>Grade</th>
              <th style={{ padding: '10px' }}>Submitted At</th>
              <th style={{ padding: '10px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td style={{ padding: '10px' }}>{r.student?.id ?? 'Unknown'}</td>
                <td style={{ padding: '10px' }}>{r.assessment?.id ?? 'Unknown'}</td>
                <td style={{ padding: '10px' }}>{r.assessment?.title ?? 'Unknown'}</td>
                <td style={{ padding: '10px' }}>{r.score}</td>
                <td style={{ padding: '10px' }}>{r.grade}</td>
                <td style={{ padding: '10px' }}>
                  {r.submittedAt
                    ? new Date(r.submittedAt).toLocaleString()
                    : 'Unknown'}
                </td>
                <td style={{ padding: '10px' }}>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(r.id)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      borderRadius: 4,
                    }}
                  >
                    Delete
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

export default AdminResults;
