// src/components/AdminResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Results.css';

const AdminResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/results');
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
      alert('Tatizo kupokea data ya matokeo ya wanafunzi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Una uhakika unataka kufuta matokeo haya?')) return;

    try {
      await axios.delete(`http://localhost:8080/api/results/${id}`);
      alert('Result imefutwa kwa mafanikio.');
      fetchResults(); // refresh table baada ya kufuta
    } catch (error) {
      console.error('Error deleting result:', error);
      alert('Tatizo kufuta result.');
    }
  };

  if (loading) return <p className="loading">Inapakia matokeo ya wanafunzi...</p>;

  return (
    <div className="results-container">
      <h2 className="results-title">📊 Matokeo ya Wanafunzi Yote</h2>
      {results.length === 0 ? (
        <p className="no-data">Hakuna matokeo yaliyopatikana.</p>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Mwanafunzi</th>
              <th>Assessment ID</th>
              <th>Somo</th>
              <th>Assessment</th>
              <th>Alama</th>
              <th>Grade</th>
              <th>Submitted At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>{result.student?.id || 'Unknown'}</td>
                <td>{result.student?.name || 'Unknown'}</td>
                <td>{result.assessment?.id || 'Unknown'}</td>
                <td>{result.assessment?.lesson?.title || 'Unknown'}</td>
                <td>{result.assessment?.title || 'Unknown'}</td>
                <td>{result.score}</td>
                <td>{result.grade}</td>
                <td>{new Date(result.submittedAt).toLocaleString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(result.id)}
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
