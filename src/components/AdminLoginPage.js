// src/components/AdminLoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Placeholder: Angalia kama credentials zipo sawa
    if (username.trim() === 'admin' && password.trim() === 'admin123') {
      navigate('/admin-dashboard');
    } else {
      alert('Jina la mtumiaji au nenosiri si sahihi');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="form-title">Karibu Admin</h2>

        <div className="input-group">
          <label>Jina la Mtumiaji</label>
          <input
            type="text"
            placeholder="Ingiza jina lako"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group password-group">
          <label>Nenosiri</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingiza nenosiri lako"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-visibility"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Ficha nenosiri' : 'Onesha nenosiri'}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
        </div>

        <button className="login-button" type="submit">
          Ingia
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
