import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LessonVideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const BASE_URL = 'http://192.168.43.33:8080';

  // Build full media URL
  const getMediaUrl = (path) => {
    if (!path) return '';
    const fullUrl = path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
    return encodeURI(fullUrl);
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/api/lessons/videos`)
      .then(response => {
        setVideos(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load lesson videos.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading lesson videos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (videos.length === 0) return <p>No lesson videos found.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Lesson Videos</h2>
      <ul style={styles.list}>
        {videos.map((video) => (
          <li key={video.id} style={styles.item}>
            <h3 style={styles.videoTitle}>{video.title}</h3>
            <p>{video.description}</p>
            <video
              width="100%"
              height="auto"
              controls
              style={styles.video}
            >
              <source src={getMediaUrl(video.videoUrl)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 800,
    margin: 'auto',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    marginBottom: 40,
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  videoTitle: {
    marginBottom: 10,
    color: '#222',
  },
  video: {
    borderRadius: 8,
    backgroundColor: 'black',
    outline: 'none',
  },
};

export default LessonVideoList;
