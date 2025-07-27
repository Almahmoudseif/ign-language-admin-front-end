import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LessonImageList = () => {
  const [lessons, setLessons] = useState([]);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = () => {
    axios.get('http://192.168.43.33:8080/api/lessons')
      .then(res => setLessons(res.data))
      .catch(err => console.error('Failed to fetch lessons:', err));
  };

  const handleDelete = async (lessonId) => {
    if (!window.confirm("Unataka kufuta picha hii kabisa?")) return;

    try {
      await axios.delete(`http://192.168.43.33:8080/api/lessons/${lessonId}`);
      setMessage("Lesson imefutwa kwa mafanikio");
      fetchLessons();
    } catch (error) {
      console.error("Error deleting lesson:", error);
      setMessage("Kuna tatizo kufuta lesson");
    }
  };

  const handleEditClick = (lessonId) => {
    setEditingLessonId(lessonId);
    setNewImage(null);
    setMessage('');
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleUpdate = async (lessonId) => {
    if (!newImage) {
      setMessage('Tafadhali chagua picha mpya');
      return;
    }

    const formData = new FormData();
    formData.append('file', newImage);

    try {
      await axios.put(
        `http://192.168.43.33:8080/api/lessons/update/image/${lessonId}`, 
        formData, 
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setMessage("Picha imesasishwa vizuri");
      setEditingLessonId(null);
      fetchLessons();
    } catch (error) {
      console.error(error);
      setMessage("Imeshindikana kusasisha picha");
    }
  };

  const handleCancel = () => {
    setEditingLessonId(null);
    setMessage('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lessons with Images</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {lessons.map((lesson) => (
          lesson.imageUrl && (
            <div key={lesson.id} style={{ width: '200px', border: '1px solid #ccc', padding: '10px' }}>
              <img
                src={`http://192.168.43.33:8080${lesson.imageUrl}`}
                alt={lesson.title}
                style={{ width: '100%' }}
              />
              <h4>{lesson.title}</h4>
              <p style={{ fontSize: '14px' }}>{lesson.description}</p>

              {editingLessonId === lesson.id ? (
                <>
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                  <button onClick={() => handleUpdate(lesson.id)} style={{ marginRight: 5 }}>Sasisha</button>
                  <button onClick={handleCancel}>Ghairi</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditClick(lesson.id)} style={{ marginRight: 5 }}>Sasisha Picha</button>
                  <button onClick={() => handleDelete(lesson.id)} style={{ backgroundColor: 'red', color: 'white' }}>
                    Futa Picha
                  </button>
                </>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default LessonImageList;
