import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyLessons = ({ teacherId = 2 }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState(null);
  const [uploadLessonId, setUploadLessonId] = useState(null);
  const [message, setMessage] = useState('');
  const BASE_URL = 'http://192.168.43.33:8080';

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/lessons/teacher/${teacherId}`);
        setLessons(res.data);
      } catch (err) {
        console.error('Error fetching lessons:', err);
        setMessage('Kuna tatizo kupakua masomo.');
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

  const handleDelete = async (lessonId) => {
    if (!window.confirm('Una uhakika unataka kufuta somo hili?')) return;

    try {
      await axios.delete(`${BASE_URL}/api/lessons/${lessonId}`);
      setLessons(lessons.filter(lesson => lesson.id !== lessonId));
      setMessage('Somo limefutwa kwa mafanikio.');
    } catch (err) {
      console.error('Error deleting lesson:', err);
      setMessage('Imeshindikana kufuta somo.');
    }
  };

  const handleImageChange = (e, lessonId) => {
    setNewImage(e.target.files[0]);
    setUploadLessonId(lessonId);
    setMessage('');
  };

  const handleImageUpload = async () => {
    if (!newImage || !uploadLessonId) {
      setMessage('Tafadhali chagua picha na somo sahihi.');
      return;
    }

    const formData = new FormData();
    formData.append('file', newImage);

    try {
      await axios.put(`${BASE_URL}/api/lessons/${uploadLessonId}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Picha imepakia upya kwa mafanikio.');
      setNewImage(null);
      setUploadLessonId(null);
      // Refresh lessons
      const res = await axios.get(`${BASE_URL}/api/lessons/teacher/${teacherId}`);
      setLessons(res.data);
    } catch (err) {
      console.error('Error uploading image:', err);
      setMessage('Imeshindikana kupakia picha.');
    }
  };

  if (loading) return <p>Inapakia masomo...</p>;

  return (
    <div style={styles.container}>
      {message && <p style={styles.message}>{message}</p>}
      {lessons.length === 0 ? (
        <p>Huna masomo yaliyopakiwa.</p>
      ) : (
        lessons.map(lesson => (
          <div key={lesson.id} style={styles.card}>
            <h4>{lesson.title}</h4>

            {lesson.imageUrl && (
              <img
                src={getMediaUrl(lesson.imageUrl)}
                alt={lesson.title}
                style={styles.image}
              />
            )}

            {lesson.videoUrl && (
              <video width="100%" height="auto" controls>
                <source src={getMediaUrl(lesson.videoUrl)} type="video/mp4" />
                Kivinjari chako hakiungi mkono video.
              </video>
            )}

            <p>{lesson.description}</p>

            <div style={styles.actions}>
              <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, lesson.id)} />
              <button onClick={handleImageUpload} disabled={!newImage || uploadLessonId !== lesson.id}>
                Badili Picha
              </button>
              <button onClick={() => handleDelete(lesson.id)} style={styles.deleteButton}>Futa Somo</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  actions: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    color: 'green',
    fontWeight: 'bold',
  }
};

export default MyLessons;
