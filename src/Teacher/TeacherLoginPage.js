import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherLoginPage = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://192.168.43.33:8080/api/users/login', {

        registrationNumber,
        password
      });

      if (response.data && response.data.role === 'TEACHER') {
        localStorage.setItem('teacher', JSON.stringify(response.data));
        navigate('/teacher-dashboard');

      } else {
        setError('Invalid credentials or not a teacher');
      }
    } catch (err) {
      setError('Login failed. Please check your registration number and password.');
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '80px auto',
      padding: '30px',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    },
    title: {
      textAlign: 'center',
      marginBottom: '25px',
      color: '#333'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#444'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      fontSize: '15px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      transition: 'border 0.3s ease'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      border: 'none',
      color: 'white',
      fontSize: '16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    buttonHover: {
      backgroundColor: '#0056b3'
    },
    error: {
      color: 'red',
      marginBottom: '15px',
      textAlign: 'center'
    }
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default TeacherLoginPage;
