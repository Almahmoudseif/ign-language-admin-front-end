import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LessonImageList = () => {
  const [lessons, setLessons] = useState([]);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [newMedia, setNewMedia] = useState(null);
  const [mediaType, setMediaType] = useState('image'); // 'image' or 'video'
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
      setMessage('❌ Failed to fetch lessons.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleDelete = async (lessonId) => {
    if (!window.confirm("Are you sure you want to permanently delete this lesson?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/lessons/${lessonId}`);
      setMessage("✅ Lesson deleted successfully");
      await fetchLessons();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      setMessage('❌ Failed to delete lesson.');
    }
  };

  const handleUpdateMedia = async (lessonId) => {
    if (!newMedia) {
      setMessage(`❌ Please choose a ${mediaType} before updating.`);
      return;
    }

    const formData = new FormData();
    formData.append('file', newMedia);

    const endpoint =
      mediaType === 'image'
        ? `${BASE_URL}/api/lessons/${lessonId}/image`
        : `${BASE_URL}/api/lessons/${lessonId}/video`;

    try {
      await axios.put(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(`✅ ${mediaType === 'image' ? 'Image' : 'Video'} updated successfully!`);
      setEditingLessonId(null);
      setNewMedia(null);
      setMediaType('image');
      await fetchLessons();
    } catch (error) {
      console.error('Error updating media:', error);
      setMessage(`❌ Failed to update ${mediaType}.`);
    }
  };

  const getFullUrl = (url) => {
    if (!url) return '';
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    return encodeURI(fullUrl);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Uploaded Lessons</h2>
      {message && (
        <p style={{ color: message.startsWith('❌') ? 'red' : 'green', fontWeight: 'bold' }}>
          {message}
        </p>
      )}

      {loading ? (
        <p>Loading lessons...</p>
      ) : lessons.length === 0 ? (
        <p>No lessons uploaded yet.</p>
      ) : (
        lessons.map((lesson) => {
          const imageUrl = getFullUrl(lesson.imageUrl);
          const videoUrl = getFullUrl(lesson.videoUrl);

          return (
            <div key={lesson.id} style={styles.card}>
              {lesson.imageUrl && (
                <img
                  src={imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={lesson.title}
                  style={styles.image}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
              )}

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
                  Your browser does not support the video tag.
                </video>
              )}

              <h4>{lesson.title}</h4>
              <p style={{ fontSize: 14 }}>{lesson.description}</p>

              {editingLessonId === lesson.id ? (
                <>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value)}
                    style={{ marginBottom: 10, padding: 5 }}
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                  <input
                    type="file"
                    accept={mediaType + '/*'}
                    onChange={(e) => setNewMedia(e.target.files[0])}
                    style={{ marginBottom: 10 }}
                  />
                  <button
                    onClick={() => handleUpdateMedia(lesson.id)}
                    style={{ marginRight: 10, padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setEditingLessonId(null);
                      setNewMedia(null);
                      setMediaType('image');
                      setMessage('');
                    }}
                    style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingLessonId(lesson.id);
                      setNewMedia(null);
                      setMessage('');
                      setMediaType('image');
                    }}
                    style={{ marginRight: 10, padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
                  >
                    Update Media
                  </button>
                  <button
                    onClick={() => handleDelete(lesson.id)}
                    style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}
                  >
                    Delete Lesson
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
  },
};

export default LessonImageList;
