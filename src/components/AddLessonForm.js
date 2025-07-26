// src/components/AddLessonForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddLessonForm.css';

const AddLessonForm = ({ onLessonAdded }) => {
  const [lesson, setLesson] = useState({
    title: '',
    description: '',
    level: 'BEGINNER'
  });

  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setLesson(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/lessons', lesson)
      .then(() => {
        setMessage('✅ Mafunzo yameongezwa!');
        setLesson({ title: '', description: '', level: 'BEGINNER' });
        if (onLessonAdded) onLessonAdded();
      })
      .catch(() => setMessage('❌ Hitilafu: Mafunzo hayakuongezwa.'));
  };

  return (
    <form className="add-lesson-form" onSubmit={handleSubmit}>
      <h3>Ongeza Mafunzo</h3>

      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={lesson.title}
        onChange={handleChange}
        required
      />

      <label>Description:</label>
      <textarea
        name="description"
        value={lesson.description}
        onChange={handleChange}
        required
      />

      <label>Level:</label>
      <select
        name="level"
        value={lesson.level}
        onChange={handleChange}
      >
        <option value="BEGINNER">Beginner</option>
        <option value="INTERMEDIATE">Intermediate</option>
        <option value="ADVANCED">Advanced</option>
      </select>

      <button type="submit">Hifadhi Mafunzo</button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
};

export default AddLessonForm;
