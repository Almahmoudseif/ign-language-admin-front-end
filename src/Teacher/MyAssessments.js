import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyAssessments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [allAssessments, setAllAssessments] = useState([]);
  const [filteredAssessments, setFilteredAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/assessments');
      setAllAssessments(res.data);
      setFilteredAssessments(res.data);
    } catch (err) {
      console.error("Failed to fetch assessments", err);
      alert("Failed to load assessments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = allAssessments.filter(a =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.lesson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAssessments(filtered);
  }, [searchQuery, allAssessments]);

  const handleCreate = () => {
    navigate('/teacher-dashboard/create-assessment');
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assessment?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/assessments/${id}`);
      setAllAssessments(prev => prev.filter(a => a.id !== id));
      alert("Assessment deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete assessment");
    }
  };

  const handleToggleType = async (id) => {
    const assessment = allAssessments.find(a => a.id === id);
    if (!assessment) return;

    const updatedAssessment = {
      ...assessment,
      type: assessment.type === 'Quiz' ? 'Written' : 'Quiz'
    };

    try {
      const response = await axios.put(`http://localhost:8080/api/assessments/${id}`, updatedAssessment);
      setAllAssessments(prev =>
        prev.map(a => (a.id === id ? response.data : a))
      );
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update type');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>My Assessments</h2>
        <button style={styles.createBtn} onClick={handleCreate}>
          + Create Assessment
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by title, lesson, or type..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchBox}
      />

      {loading ? (
        <p style={styles.noData}>Loading assessments...</p>
      ) : filteredAssessments.length === 0 ? (
        <p style={styles.noData}>No assessments found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Lesson</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Due Date</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssessments.map((a, index) => (
              <tr key={a.id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{a.title}</td>
                <td style={styles.td}>{a.lesson}</td>
                <td style={styles.td}>{a.type}</td>
                <td style={styles.td}>{a.dueDate}</td>
                <td style={styles.td}>
                  <button
                    style={styles.actionBtn}
                    onClick={() => handleToggleType(a.id)}
                  >
                    Toggle Type
                  </button>
                  <button
                    style={{ ...styles.actionBtn, backgroundColor: 'red' }}
                    onClick={() => handleDelete(a.id)}
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

const styles = {
  container: {
    padding: '20px',
    maxWidth: '950px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  heading: {
    color: '#2c3e50',
    margin: 0,
  },
  createBtn: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  searchBox: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 8px rgba(0,0,0,0.05)',
  },
  th: {
    padding: '12px',
    backgroundColor: '#f8f9fa',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '1px solid #ccc',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee',
  },
  noData: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    marginTop: '20px',
  },
  actionBtn: {
    marginRight: '8px',
    padding: '5px 10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default MyAssessments;
