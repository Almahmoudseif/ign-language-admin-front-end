import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/admin/login', {
        registrationNumber,
        password,
      });

      // Login imeshafanikiwa
      const adminData = response.data;
      console.log('Admin logged in:', adminData);

      // Hifadhi data au token kama utatumia JWT baadaye
      // localStorage.setItem('admin', JSON.stringify(adminData));

      navigate('/admin-dashboard'); // Navigates kwenye dashboard
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data); // Onyesha message kutoka backend
      } else {
        alert('Kuna tatizo la kuunganisha na server. Jaribu tena.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="form-title">Karibu Admin</h2>

        <div className="input-group">
          <label>Registration Number</label>
          <input
            type="text"
            placeholder="Ingiza registration number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
          />
        </div>

        <div className="input-group password-group">
          <label>Nenosiri</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingiza nenosiri"
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

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? 'Iningia...' : 'Ingia'}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
