import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://192.168.43.33:8080/api';  // Badilisha hapa kwa IP/URL ya backend yako

const CreateAssessment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [date, setDate] = useState('');
  const [lessonId, setLessonId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [lessons, setLessons] = useState([]);
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Pata lessons kutoka backend
  useEffect(() => {
    axios.get(`${BASE_URL}/lessons`)
      .then(res => setLessons(res.data))
      .catch(err => console.error('Failed to fetch lessons:', err));
  }, []);

  // Pata students kutoka backend
  useEffect(() => {
    axios.get(`${BASE_URL}/users/students`)
      .then(res => setStudents(res.data))
      .catch(err => console.error('Failed to fetch students:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAssessment = {
      title,
      description,
      level: level.toUpperCase(),
      date,
      lesson: { id: parseInt(lessonId) },
      student: { id: parseInt(studentId) }
    };

    try {
      const res = await axios.post(`${BASE_URL}/assessments`, newAssessment, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.status === 200 || res.status === 201) {
        setMessage('Assessment created successfully!');
        setError('');
        setTitle('');
        setDescription('');
        setLevel('');
        setDate('');
        setLessonId('');
        setStudentId('');
      }
    } catch (err) {
      setError('Failed to create assessment. Please check your data.');
      setMessage('');
      console.error('Create assessment error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center' }}>Create New Assessment</h2>

      {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="Enter assessment title"
            style={{ width: '100%', padding: 10 }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Enter assessment description"
            style={{ width: '100%', padding: 10 }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Level:</label><br />
          <select
            value={level}
            onChange={e => setLevel(e.target.value)}
            required
            style={{ width: '100%', padding: 10 }}
          >
            <option value="">Select Level</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Due Date:</label><br />
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            style={{ width: '100%', padding: 10 }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Lesson:</label><br />
          <select
            value={lessonId}
            onChange={e => setLessonId(e.target.value)}
            required
            style={{ width: '100%', padding: 10 }}
          >
            <option value="">Select Lesson</option>
            {lessons.map(lesson => (
              <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Student:</label><br />
          <select
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            required
            style={{ width: '100%', padding: 10 }}
          >
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.fullName}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: '12px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            width: '100%',
            fontSize: 16,
          }}
        >
          Create Assessment
        </button>
      </form>
    </div>
  );
};

export default CreateAssessment;
