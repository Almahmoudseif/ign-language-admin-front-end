import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EditLessonsList = () => {
  const [lessons, setLessons] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await fetch('http://192.168.43.33:8080/api/lessons');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setLessons(data);
        if (data.length === 0) setMessage('No lessons found.');
      } catch (err) {
        console.error(err);
        setMessage('Failed to fetch lessons.');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading) {
    return <div style={styles.container}><p>Loading lessons...</p></div>;
  }

  return (
    <div style={styles.container}>
      <h2>Lessons List for Editing</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      {lessons.length > 0 && (
        <ul style={styles.list}>
          {lessons.map(lesson => (
            <li key={lesson.id} style={styles.listItem}>
              <div>
                <strong>{lesson.title}</strong> - {lesson.level}
              </div>
              <Link to={`/teacher-dashboard/edit-lesson/${lesson.id}`} style={styles.editLink}>
                ✏️ Edit
              </Link>
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
