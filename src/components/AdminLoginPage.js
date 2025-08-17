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
      const response = await axios.post(
        'http://192.168.43.33:8080/api/admin/login',
        { registrationNumber, password }
      );

      const adminData = response.data;
      console.log('Admin logged in:', adminData);

      // Hifadhi data kwenye localStorage
      localStorage.setItem("token", "admin-logged-in"); // token feki, unaweza baadaye kutumia JWT
      localStorage.setItem("role", adminData.role);
      localStorage.setItem("registrationNumber", adminData.registrationNumber);

      navigate('/admin-dashboard');
    } catch (error) {
      console.error(error);

      // Hapa tunahakikisha tunabadilisha object kuwa string
      let errorMessage = 'Kuna tatizo la kuunganisha na server. Jaribu tena.';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = JSON.stringify(error.response.data);
        }
      }
      alert(errorMessage);
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
