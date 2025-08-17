import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const BASE_URL = 'http://192.168.43.33:8080';

  const teacherId = localStorage.getItem('teacherId');
  const teacherName = localStorage.getItem('teacherName');

  useEffect(() => {
    if (!teacherId) {
      setMessage('❌ Teacher ID not found. Please login first.');
      setLoading(false);
      return;
    }

    const fetchLessons = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/lessons/teacher/${teacherId}`);
        setLessons(res.data);
      } catch (err) {
        console.error('Error fetching lessons:', err);
        setMessage('There was an issue fetching lessons.');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [teacherId]);

  const getMediaUrl = (path) => {
    if (!path) return null;
    const fullUrl = path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
    return encodeURI(fullUrl);
  };

  if (loading) return <p>Loading lessons...</p>;

  // Split lessons: images left column, videos right column
  const pictureLessons = lessons.filter(l => l.imageUrl);
  const videoLessons = lessons.filter(l => l.videoUrl);

  return (
    <div style={styles.container}>
      {teacherName && <h3>Welcome, {teacherName}</h3>}
      {message && <p style={message.startsWith('❌') ? { color: 'red', fontWeight: 'bold' } : { color: 'green', fontWeight: 'bold' }}>{message}</p>}

      <div style={styles.columns}>
        {/* Image column */}
        <div style={styles.column}>
          {pictureLessons.length === 0 ? (
            <p>No image lessons available.</p>
          ) : (
            pictureLessons.map(lesson => (
              <div key={lesson.id} style={styles.card}>
                <h4>{lesson.title}</h4>
                <p style={{ fontStyle: 'italic' }}>Level: {lesson.lessonLevel}</p>
                {lesson.description && <p>{lesson.description}</p>}
                <img
                  src={getMediaUrl(lesson.imageUrl)}
                  alt={lesson.title}
                  style={styles.media}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  onClick={() => window.open(getMediaUrl(lesson.imageUrl), '_blank')}
                />
              </div>
            ))
          )}
        </div>

        {/* Video column */}
        <div style={styles.column}>
          {videoLessons.length === 0 ? (
            <p>No video lessons available.</p>
          ) : (
            videoLessons.map(lesson => (
              <div key={lesson.id} style={styles.card}>
                <h4>{lesson.title}</h4>
                <p style={{ fontStyle: 'italic' }}>Level: {lesson.lessonLevel}</p>
                {lesson.description && <p>{lesson.description}</p>}
                <video
                  style={styles.media}
                  controls
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  onClick={() => window.open(getMediaUrl(lesson.videoUrl), '_blank')}
                >
                  <source src={getMediaUrl(lesson.videoUrl)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  columns: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
  },
  media: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
};

export default MyLessons;
