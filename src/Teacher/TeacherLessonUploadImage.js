import React, { useState } from 'react';
import axios from 'axios';

const TeacherLessonUploadImage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('level', level);
    formData.append('file', image);

    try {
      await axios.post('http://192.168.43.33:8080/api/lessons/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('✅ Lesson uploaded successfully!');
      setTitle('');
      setDescription('');
      setLevel('');
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to upload lesson');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>📷 Upload Lesson Image</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="3"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        >
          <option value="">Select Level</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          style={{ marginBottom: '10px' }}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default TeacherLessonUploadImage;
