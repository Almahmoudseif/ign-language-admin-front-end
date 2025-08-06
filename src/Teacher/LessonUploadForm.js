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

  const teacherId = 50; // badilisha na teacherId halisi uliyonayo

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
        setMessage('✅ Somo limepakiwa kwa mafanikio!');
        setTitle('');
        setDescription('');
        setLevel('');
        setImage(null);
        setVideo(null);
        imageRef.current.value = '';
        videoRef.current.value = '';
      } else {
        setMessage(`⚠️ Hitilafu: ${resultText}`);
      }
    } catch (err) {
      setLoading(false);
      setMessage('⛔ Hitilafu ya mtandao. Tafadhali jaribu tena.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Pakia Somo Jipya</h2>
      <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Jina la Somo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Maelezo ya Somo"
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
          <option value="">Chagua Ngazi</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>

        <label style={styles.label}>Pakia Picha:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          ref={imageRef}
          style={styles.input}
        />

        <label style={styles.label}>Pakia Video:</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          ref={videoRef}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Inapakia...' : 'Upload Somo'}
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
