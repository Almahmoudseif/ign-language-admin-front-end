import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LessonImageList = () => {
  const [lessons, setLessons] = useState([]);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const BASE_URL = 'http://192.168.43.33:8080';

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/lessons`);
      setLessons(res.data);
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
      setMessage('❌ Tatizo kuleta masomo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleDelete = async (lessonId) => {
    if (!window.confirm("Unataka kufuta somo hili kabisa?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/lessons/${lessonId}`);
      setMessage("✅ Somo limefutwa kwa mafanikio");
      await fetchLessons();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      setMessage('❌ Tatizo kufuta somo.');
    }
  };

  const handleUpdateImage = async (lessonId) => {
    if (!newImage) {
      setMessage('❌ Tafadhali chagua picha mpya kabla ya kusasisha.');
      return;
    }

    const formData = new FormData();
    formData.append('file', newImage);

    try {
      await axios.put(`${BASE_URL}/api/lessons/update/image/${lessonId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('✅ Picha imesasishwa vizuri!');
      setEditingLessonId(null);
      setNewImage(null);
      await fetchLessons();
    } catch (error) {
      console.error('Error updating image:', error);
      setMessage('❌ Imeshindikana kusasisha picha.');
    }
  };

  const getFullImageUrl = (url) => {
    if (!url) return '';
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    return encodeURI(fullUrl);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Masomo Yaliyopakiwa</h2>
      {message && (
        <p style={{ color: message.startsWith('❌') ? 'red' : 'green', fontWeight: 'bold' }}>
          {message}
        </p>
      )}

      {loading ? (
        <p>Inapakia masomo...</p>
      ) : lessons.length === 0 ? (
        <p>Hakuna masomo yaliyopakiwa bado.</p>
      ) : (
        lessons.map((lesson) => {
          const imageUrl = getFullImageUrl(lesson.imageUrl);
          const videoUrl = getFullImageUrl(lesson.videoUrl);

          return (
            <div key={lesson.id} style={styles.card}>
              <img
                src={imageUrl || 'https://via.placeholder.com/300x200?text=Hakuna+Picha'}
                alt={lesson.title}
                style={styles.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                }}
              />

              {lesson.videoUrl && (
                <video
                  controls
                  style={styles.video}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Browser yako haiungi mkono video.
                </video>
              )}

              <h4>{lesson.title}</h4>
              <p style={{ fontSize: 14 }}>{lesson.description}</p>

              {editingLessonId === lesson.id ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImage(e.target.files[0])}
                  />
                  <button onClick={() => handleUpdateImage(lesson.id)}>Sasisha</button>
                  <button onClick={() => {
                    setEditingLessonId(null);
                    setNewImage(null);
                    setMessage('');
                  }}>
                    Ghairi
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => {
                    setEditingLessonId(lesson.id);
                    setNewImage(null);
                    setMessage('');
                  }}>
                    Sasisha Picha
                  </button>
                  <button
                    onClick={() => handleDelete(lesson.id)}
                    style={{ backgroundColor: 'red', color: 'white' }}
                  >
                    Futa Somo
                  </button>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

const styles = {
  card: {
    width: 320,
    border: '1px solid #ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: 180,
    objectFit: 'cover',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  }
};

export default LessonImageList;
