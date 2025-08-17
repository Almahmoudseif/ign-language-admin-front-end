import React, { useState } from 'react';

const VideoUploadOnly = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState('');

  // Teacher info is taken from localStorage after login
  const teacherId = localStorage.getItem('teacherId'); // must be saved during login

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video || !title || !description || !level) {
      setMessage('⚠️ Please fill in all fields.');
      return;
    }

    if (!teacherId) {
      setMessage('❌ Teacher is not logged in or not found.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('level', level.toUpperCase());
    formData.append('teacherId', teacherId); // automatic teacher assignment
    formData.append('video', video);

    try {
      const res = await fetch('http://192.168.43.33:8080/api/lessons', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage('✅ Video uploaded successfully!');
        setTitle('');
        setDescription('');
        setLevel('');
        setVideo(null);
      } else {
        const errText = await res.text();
        setMessage(`❌ Upload failed: ${errText}`);
      }
    } catch (error) {
      setMessage('❌ Network or server error.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload Lesson Video</h2>
      {message && (
        <p style={{ color: message.startsWith('❌') ? 'red' : 'green' }}>{message}</p>
      )}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Lesson Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          required
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={styles.input}
          required
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
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Upload Video</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: 'auto',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    border: '1px solid #ccc'
  },
  textarea: {
    padding: 10,
    fontSize: 16,
    height: 100,
    borderRadius: 5,
    border: '1px solid #ccc',
    resize: 'vertical'
  },
  button: {
    padding: 12,
    fontSize: 16,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer'
  }
};

export default VideoUploadOnly;
