import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = 'http://192.168.43.33:8080';

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/lessons`);
        setLessons(res.data);
      } catch (err) {
        console.error('Error fetching lessons:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  const getMediaUrl = (path) => {
    if (!path) return null;
    const fullUrl = path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
    return encodeURI(fullUrl);
  };

  const imageLessons = lessons.filter(lesson => lesson.imageUrl);
  const videoLessons = lessons.filter(lesson => lesson.videoUrl);

  if (loading) return <p>Inapakia masomo...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.column}>
        <h2>Masomo ya Picha</h2>
        {imageLessons.length === 0 ? (
          <p>Hakuna masomo yenye picha.</p>
        ) : (
          imageLessons.map(lesson => (
            <div key={lesson.id} style={styles.card}>
              <h4>{lesson.title}</h4>
              <img
                src={getMediaUrl(lesson.imageUrl)}
                alt={lesson.title}
                style={styles.image}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x250?text=Picha+haipo';
                }}
              />
              <p>{lesson.description}</p>
            </div>
          ))
        )}
      </div>

      <div style={styles.column}>
        <h2>Masomo ya Video</h2>
        {videoLessons.length === 0 ? (
          <p>Hakuna masomo yenye video.</p>
        ) : (
          videoLessons.map(lesson => (
            <div key={lesson.id} style={styles.card}>
              <h4>{lesson.title}</h4>
              <video width="100%" height="auto" controls>
                <source src={getMediaUrl(lesson.videoUrl)} type="video/mp4" />
                Kivinjari chako hakiungi mkono video.
              </video>
              <p>{lesson.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '40px',
    padding: '20px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  column: {
    flex: 1,
    minWidth: '300px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
};

export default MyLessons;
