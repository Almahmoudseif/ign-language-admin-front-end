// src/components/Results.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Results.css';

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/results');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
        alert('Tatizo kupokea data ya matokeo');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) return <p className="loading">Inapakia matokeo...</p>;

  return (
    <div className="results-container">
      <h2 className="results-title">📊 Matokeo ya Wanafunzi</h2>
      {results.length === 0 ? (
        <p className="no-data">Hakuna matokeo yaliyopatikana.</p>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th>Mwanafunzi</th>
              <th>Somo</th>
              <th>Assessment</th>
              <th>Alama</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>{result.studentName}</td>
                <td>{result.lessonTitle}</td>
                <td>{result.assessmentTitle}</td>
                <td>{result.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Results;
