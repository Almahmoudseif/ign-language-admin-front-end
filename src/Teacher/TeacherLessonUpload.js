import React, { useState } from 'react';
import axios from 'axios';

const TeacherLessonUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      setMessage('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('level', level);
    formData.append('file', video); // Hii inalingana na @RequestParam("file")

    try {
      await axios.post(
        'http://192.168.43.33:8080/api/lessons/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMessage('Lesson uploaded successfully!');
      setTitle('');
      setDescription('');
      setLevel('');
      setVideo(null);
    } catch (error) {
      console.error('Error uploading lesson:', error);
      setMessage('Failed to upload lesson.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload New Lesson</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Description"
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
          <option value="">Select Level</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>
        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => setVideo(e.target.files[0])}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Upload Lesson
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
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '10px',
    fontSize: '16px'
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    height: '100px'
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default TeacherLessonUpload;
