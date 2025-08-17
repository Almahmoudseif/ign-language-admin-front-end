import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TeacherLoginPage.css';

const TeacherLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://192.168.43.33:8080/api/auth/login', {
        email,
        password,
      });

      // assume backend inarudisha token na user info
      const { token, user } = response.data;

      if (user.role !== 'TEACHER') {
        setError('Hii login ni kwa walimu tu');
        return;
      }

      // weka token kwenye localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/teacher-dashboard'); // navigate kwenye dashboard ya teacher
    } catch (err) {
      console.error('Login error:', err);
      setError('Email au nenosiri si sahihi');
    }
  };

  return (
    <div className="teacher-login-container">
      <h2>Login ya Mwalimu</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Barua pepe"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nenosiri"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Ingia</button>
      </form>
    </div>
  );
};

export default TeacherLoginPage;
