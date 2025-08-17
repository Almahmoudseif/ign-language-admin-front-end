import React, { useState, useRef } from 'react';

const LessonUploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const imageRef = useRef();
  const videoRef = useRef();

  const teacherId = 50; // replace with your actual teacherId

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('level', level);
    formData.append('teacherId', teacherId);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    setLoading(true);
    try {
      const res = await fetch('http://192.168.43.33:8080/api/lessons', {
        method: 'POST',
        body: formData,
      });

      setLoading(false);

      const resultText = await res.text();

      if (res.ok) {
        setMessage('✅ Lesson uploaded successfully!');
        setTitle('');
        setDescription('');
        setLevel('');
        setImage(null);
        setVideo(null);
        imageRef.current.value = '';
        videoRef.current.value = '';
      } else {
        setMessage(`⚠️ Error: ${resultText}`);
      }
    } catch (err) {
      setLoading(false);
      setMessage('⛔ Network error. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Upload New Lesson</h2>
      <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Lesson Description"
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

        <label style={styles.label}>Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          ref={imageRef}
          style={styles.input}
        />

        <label style={styles.label}>Upload Video:</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          ref={videoRef}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Lesson'}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  label: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
};

export default LessonUploadForm;
