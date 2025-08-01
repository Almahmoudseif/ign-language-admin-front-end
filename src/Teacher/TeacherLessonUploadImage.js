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
      setMessage('Tafadhali chagua picha.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('level', level);
    formData.append('image', image);

    try {
      await axios.post('http://192.168.43.33:8080/api/lessons/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('✅ Picha imepakiwa kikamilifu!');
      setTitle('');
      setDescription('');
      setLevel('');
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage('❌ Imeshindikana kupakia picha.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Pakia Picha ya Somo</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Kichwa cha somo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Maelezo ya somo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Chagua kiwango</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Pakia Picha
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '10px', fontSize: '16px' },
  textarea: { padding: '10px', height: '100px' },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default TeacherLessonUploadImage;
