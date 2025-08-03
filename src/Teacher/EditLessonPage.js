import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditLessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: '',
    imageUrl: '',
    videoUrl: ''
  });

  useEffect(() => {
    axios.get(`http://192.168.43.33:8080/api/lessons/${id}`)
      .then((response) => {
        setLesson(response.data);
        setFormData({
          title: response.data.title || '',
          description: response.data.description || '',
          level: response.data.level || '',
          imageUrl: response.data.imageUrl || '',
          videoUrl: response.data.videoUrl || ''
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Imeshindikana kupakia somo:', error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://192.168.43.33:8080/api/lessons/${id}`, formData)
      .then(() => {
        alert('Somo limehaririwa kwa mafanikio!');
        navigate('/teacher-dashboard');
      })
      .catch((error) => {
        console.error('Imeshindikana kuhariri somo:', error);
        alert('Kuna tatizo katika kuhariri somo.');
      });
  };

  if (loading) {
    return <div>Inapakia somo...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Hariri Somo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Jina la Somo:</label><br />
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Maelezo:</label><br />
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
        </div>
        <div>
          <label>Kiwango cha Somo:</label><br />
          <select name="level" value={formData.level} onChange={handleChange} required>
            <option value="">Chagua kiwango</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>
        <div>
          <label>Image URL:</label><br />
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
          {formData.imageUrl && (
            <div style={{ marginTop: '10px' }}>
              <img src={formData.imageUrl} alt="Preview" width="200" />
            </div>
          )}
        </div>
        <div>
          <label>Video URL:</label><br />
          <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} />
          {formData.videoUrl && (
            <div style={{ marginTop: '10px' }}>
              <video width="300" controls>
                <source src={formData.videoUrl} type="video/mp4" />
                Kivinjari chako hakiungi mkono video.
              </video>
            </div>
          )}
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Hifadhi Mabadiliko</button>
      </form>
    </div>
  );
};

export default EditLessonPage;
