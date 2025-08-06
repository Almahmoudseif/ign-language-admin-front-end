import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import AssessmentBuilder from './AssessmentBuilder'; // ✅ path sahihi
import AllAssessments from './AllAssessments'; // ✅ ume-import pia hapa

// VideoUploadOnly component (exported separately)
export const VideoUploadOnly = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) {
      setMessage('Tafadhali chagua faili la video.');
      return;
    }
    if (!title || !description || !level) {
      setMessage('Tafadhali jaza sehemu zote za fomu.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('level', level);
    formData.append('video', video);

    try {
      const res = await fetch('http://192.168.43.33:8080/api/lessons/upload/video', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage('Video imepakiwa kwa mafanikio!');
        setTitle('');
        setDescription('');
        setLevel('');
        setVideo(null);
      } else {
        setMessage('Imeshindikana ku-upload video.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setMessage('Imeshindikana ku-upload video.');
    }
  };

  return (
    <div style={styles.uploadContainer}>
      <h2>Upload Video Pekee</h2>
      {message && <p style={{ color: message.includes('Imeshindikana') ? 'red' : 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Kichwa cha Somo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Maelezo ya Somo"
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
          <option value="">Chagua Kiwango</option>
          <option value="BEGINNER">Mwanzo</option>
          <option value="INTERMEDIATE">Kati</option>
          <option value="ADVANCED">Juu</option>
        </select>
        <input
          type="file"
          accept="video/mp4,video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Upload Video</button>
      </form>
    </div>
  );
};

// TeacherDashboard component
const TeacherDashboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Teacher Panel</h2>
        <ul style={styles.menu}>
          <li><NavLink to="lessons" style={navStyle}>📚 Lessons</NavLink></li>
          <li><NavLink to="upload-lesson" style={navStyle}>⬆️ Upload Lesson</NavLink></li>
          <li><NavLink to="upload-lesson-image" style={navStyle}>🖼️ Upload Lesson Image</NavLink></li>
          <li><NavLink to="lesson-images" style={navStyle}>📷 View Lesson Images</NavLink></li>
          <li><NavLink to="upload-video" style={navStyle}>📹 Upload Video</NavLink></li>
          <li><NavLink to="lesson-videos" style={navStyle}>📺 View Lesson Videos</NavLink></li>
          <li><NavLink to="exams" style={navStyle}>📝 Exams</NavLink></li>
          <li><NavLink to="results" style={navStyle}>📊 Results</NavLink></li>
          <li><NavLink to="students" style={navStyle}>👥 My Students</NavLink></li>
          <li><NavLink to="assessments" style={navStyle}>📂 Assessments</NavLink></li>
          <li><NavLink to="all-assessments" style={navStyle}>📋 All Assessments</NavLink></li> {/* Hii ndio umeongeza */}
          <li><NavLink to="create-assessment" style={navStyle}>➕ Create Assessment</NavLink></li>
          <li><NavLink to="add-question" style={navStyle}>➕ Add Question</NavLink></li>
          <li><NavLink to="edit-lessons" style={navStyle}>✏️ Edit Lessons List</NavLink></li>
          <li><NavLink to="assessment-builder" style={navStyle}>🛠️ Assessment Builder</NavLink></li>
        </ul>
      </div>
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

const navStyle = ({ isActive }) =>
  isActive
    ? { ...styles.menuItem, ...styles.activeMenuItem }
    : styles.menuItem;

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '20px',
  },
  logo: {
    fontSize: '20px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  menu: {
    listStyleType: 'none',
    padding: 0,
  },
  menuItem: {
    display: 'block',
    padding: '12px 10px',
    marginBottom: '10px',
    backgroundColor: '#495057',
    borderRadius: '6px',
    cursor: 'pointer',
    userSelect: 'none',
    color: 'white',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
  activeMenuItem: {
    backgroundColor: '#007bff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
  uploadContainer: {
    maxWidth: 600,
    margin: 'auto',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
  },
  textarea: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  button: {
    padding: 12,
    fontSize: 16,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default TeacherDashboard;
