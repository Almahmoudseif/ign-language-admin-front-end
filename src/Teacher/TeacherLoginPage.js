import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherLoginPage = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://192.168.43.33:8080/api/auth/login', {
        registrationNumber,
        password
      });

      console.log('Login response:', response.data);

      if (response.data && response.data.role?.toLowerCase() === 'teacher') {
        localStorage.setItem('teacher', JSON.stringify(response.data));
        localStorage.setItem('teacherId', response.data.id);
        localStorage.setItem('teacherName', response.data.name);
        navigate('/teacher-dashboard');
      } else {
        setError('Invalid credentials or not a teacher');
      }
    } catch (err) {
      console.error('Login error:', err.response || err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (typeof err.response?.data === 'string') {
        setError(err.response.data);
      } else {
        setError('Login failed. Please check your registration number and password.');
      }
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '80px auto',
      padding: '30px',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    },
    title: { textAlign: 'center', marginBottom: '25px', color: '#333' },
    formGroup: { marginBottom: '20px', position: 'relative' },
    label: { display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#444' },
    input: { width: '100%', padding: '10px 12px', fontSize: '15px', border: '1px solid #ccc', borderRadius: '8px', transition: 'border 0.3s ease' },
    toggleBtn: { position: 'absolute', right: '12px', top: '35px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#007bff' },
    button: { width: '100%', padding: '12px', backgroundColor: '#007bff', border: 'none', color: 'white', fontSize: '16px', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.3s ease' },
    error: { color: 'red', marginBottom: '15px', textAlign: 'center' },
    forgot: { textAlign: 'right', marginTop: '10px', color: '#007bff', cursor: 'pointer', fontSize: '14px' }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Teacher Login</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleLogin}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Registration Number</label>
          <input
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button
            type="button"
            style={styles.toggleBtn}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div
          style={styles.forgot}
          onClick={() => alert('Forgot password clicked!')}
        >
          Forgot Password?
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default TeacherLoginPage;
