import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const TeacherDashboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Teacher Panel</h2>
        <ul style={styles.menu}>
          <li>
            <NavLink to="lessons" style={navStyle}>📚 Lessons</NavLink>
          </li>
          <li>
            <NavLink to="upload-lesson" style={navStyle}>⬆️ Upload Lesson</NavLink>
          </li>
          <li>
            <NavLink to="upload-lesson-image" style={navStyle}>🖼️ Upload Lesson Image</NavLink>
          </li>
          <li>
            <NavLink to="lesson-images" style={navStyle}>📷 View Lesson Images</NavLink>
          </li>  {/* === Hii ni addition mpya === */}
          <li>
            <NavLink to="exams" style={navStyle}>📝 Exams</NavLink>
          </li>
          <li>
            <NavLink to="results" style={navStyle}>📊 Results</NavLink>
          </li>
          <li>
            <NavLink to="students" style={navStyle}>👥 My Students</NavLink>
          </li>
          <li>
            <NavLink to="assessments" style={navStyle}>📂 Assessments</NavLink>
          </li>
          <li>
            <NavLink to="create-assessment" style={navStyle}>➕ Create Assessment</NavLink>
          </li>
          <li>
            <NavLink to="add-question" style={navStyle}>➕ Add Question</NavLink>
          </li>
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
};

export default TeacherDashboard;
