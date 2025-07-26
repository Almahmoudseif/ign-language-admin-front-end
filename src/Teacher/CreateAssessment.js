import React, { useState } from 'react';
import axios from 'axios';

const CreateAssessmentForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

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
        setTitle('');
        setDescription('');
        setLevel('');
        setDate('');
      }
    } catch (error) {
      setMessage('Failed to create assessment.');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Create New Assessment</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Level:</label><br />
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            placeholder="e.g. Beginner, Intermediate"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Date:</label><br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>
          Create Assessment
        </button>
      </form>
    </div>
  );
};

export default CreateAssessmentForm;
