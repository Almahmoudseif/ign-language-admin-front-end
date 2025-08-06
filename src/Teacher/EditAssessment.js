import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState({
    title: '',
    description: '',
    level: '',
    dueDate: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch assessment data when component mounts or id changes
  useEffect(() => {
    fetch(`http://localhost:8080/api/assessments/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch assessment');
        return res.json();
      })
      .then(data => {
        setAssessment({
          title: data.title || '',
          description: data.description || '',
          level: data.level || '',
          dueDate: data.dueDate ? data.dueDate.split('T')[0] : ''  // format date to yyyy-mm-dd
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssessment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    fetch(`http://localhost:8080/api/assessments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assessment),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update assessment');
        alert('Assessment imehaririwa kwa mafanikio!');
        navigate('/teacher-dashboard/assessments');
      })
      .catch(err => {
        setError(err.message);
      });
  };

  if (loading) return <p>Inapakia assessment...</p>;
  if (error) return <p style={{ color: 'red' }}>Kosa: {error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Hariri Assessment</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <label>
          Kichwa:
          <input
            type="text"
            name="title"
            value={assessment.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </label>
        <label>
          Maelezo:
          <textarea
            name="description"
            value={assessment.description}
            onChange={handleChange}
            required
            rows={4}
            style={{ width: '100%', padding: 8 }}
          />
        </label>
        <label>
          Kiwango:
          <select
            name="level"
            value={assessment.level}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8 }}
          >
            <option value="">Chagua Kiwango</option>
            <option value="BEGINNER">BEGINNER</option>
            <option value="INTERMEDIATE">INTERMEDIATE</option>
            <option value="ADVANCED">ADVANCED</option>
          </select>
        </label>
        <label>
          Tarehe ya Kumalizika:
          <input
            type="date"
            name="dueDate"
            value={assessment.dueDate}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Hifadhi Mabadiliko
        </button>
      </form>
    </div>
  );
};

export default EditAssessment;
