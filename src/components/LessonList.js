import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LessonList.css';

const LessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [filterLevel, setFilterLevel] = useState('ALL');
  const [loading, setLoading] = useState(false);

  const fetchLessons = () => {
    setLoading(true);
    const url =
      filterLevel === 'ALL'
        ? 'http://localhost:8080/api/lessons'
        : `http://localhost:8080/api/lessons/level/${filterLevel}`;

    axios.get(url)
      .then(res => setLessons(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLessons();
  }, [filterLevel]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/lessons/${id}`)
      .then(() => fetchLessons())
      .catch(err => console.error(err));
  };

  return (
    <div className="lesson-list-container">
      <div className="lesson-list-header">
        <h3>Orodha ya Mafunzo</h3>

        <div className="filter-section">
          <label>Chuja kwa Level: </label>
          <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)}>
            <option value="ALL">Zote</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Inapakia...</p>
      ) : lessons.length === 0 ? (
        <p>Hakuna mafunzo yaliyopatikana.</p>
      ) : (
        <ul className="lesson-list">
          {lessons.map(lesson => (
            <li key={lesson.id} className="lesson-item">
              <div className="lesson-title">{lesson.title}</div>
              <div className="lesson-description">{lesson.description}</div>
              <div className="lesson-level">Level: {lesson.level}</div>
              <button className="delete-button" onClick={() => handleDelete(lesson.id)}>
                Futa
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LessonList;
