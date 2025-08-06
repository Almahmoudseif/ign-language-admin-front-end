import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EditLessonsList = () => {
  const [lessons, setLessons] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://192.168.43.33:8080/api/lessons')
      .then(res => res.json())
      .then(data => setLessons(data))
      .catch(err => {
        console.error(err);
        setMessage('Imeshindikana kupata lessons.');
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2>Orodha ya Lessons kwa Ku-edit</h2>
      {message && <p style={{color: 'red'}}>{message}</p>}
      {lessons.length === 0 ? (
        <p>Hakuna lessons zilizopatikana.</p>
      ) : (
        <ul style={styles.list}>
          {lessons.map(lesson => (
            <li key={lesson.id} style={styles.listItem}>
              <strong>{lesson.title}</strong> - {lesson.level}
              <Link to={`/teacher-dashboard/edit-lesson/${lesson.id}`} style={styles.editLink}>✏️ Hariri</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 700,
    margin: 'auto',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: 15,
    padding: 10,
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editLink: {
    textDecoration: 'none',
    color: '#007bff', 
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default EditLessonsList;
