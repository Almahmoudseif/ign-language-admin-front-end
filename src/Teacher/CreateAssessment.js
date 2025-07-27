import React, { useState } from 'react';
import axios from 'axios';

const CreateAssessment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAssessment = {
      title,
      description,
      level,
      date,
    };

    try {
      const res = await axios.post('http://localhost:8080/api/assessments', newAssessment);
      if (res.status === 200) {
        setMessage('Assessment created successfully!');
        setError('');
        setTitle('');
        setDescription('');
        setLevel('');
        setDate('');
      }
    } catch (err) {
      setError('Failed to create assessment. Please check your data.');
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Create New Assessment</h2>

      {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter assessment title"
            style={{ width: '100%', padding: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Enter assessment description"
            style={{ width: '100%', padding: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Level:</label><br />
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            placeholder="e.g. Beginner, Intermediate"
            style={{ width: '100%', padding: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Due Date:</label><br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '12px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '16px',
          }}
        >
          Create Assessment
        </button>
      </form>
    </div>
  );
};

export default CreateAssessment;
