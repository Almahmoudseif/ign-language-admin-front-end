import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeacherLoginPage.css';

const TeacherLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hapa unaweza tumia API halisi ya backend
    if (email === 'teacher@example.com' && password === 'password') {
      navigate('/teacher-dashboard');
    } else {
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
