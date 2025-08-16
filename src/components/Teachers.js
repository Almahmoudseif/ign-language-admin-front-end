import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Teachers.css';

const BASE_URL = 'http://192.168.43.33:8080/api/users';

const Teachers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: '',
    email: '',
    registrationNumber: '',
    role: 'STUDENT',
    password: '',
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Tatizo kupokea data ya users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Una uhakika unataka kufuta user hii?')) {
      try {
        await axios.delete(`${BASE_URL}/${id}`);
        alert('User imefutwa kwa mafanikio');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Tatizo kufuta user');
      }
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditForm({
      fullName: user.fullName,
      email: user.email,
      registrationNumber: user.registrationNumber,
      role: user.role,
      password: '',
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = { ...editForm };
      if (!updateData.password) delete updateData.password;
      await axios.put(`${BASE_URL}/${editUser.id}`, updateData);
      alert('User imebadilishwa kwa mafanikio');
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Tatizo kubadilisha user');
    }
  };

  if (loading) return <p>Inapakia users...</p>;
  if (users.length === 0) return <p>Hakuna users waliopo.</p>;

  return (
    <div className="teachers-container">
      <h2>Orodha ya Users</h2>
      <table className="teachers-table">
        <thead>
          <tr>
            <th>Jina Kamili</th>
            <th>Email</th>
            <th>Registration Number</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.registrationNumber}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Update User</h3>
            <form onSubmit={handleUpdate}>
              <label>Jina Kamili</label>
              <input
                type="text"
                value={editForm.fullName}
                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                required
              />
              <label>Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                required
              />
              <label>Registration Number</label>
              <input
                type="text"
                value={editForm.registrationNumber}
                onChange={(e) => setEditForm({ ...editForm, registrationNumber: e.target.value })}
                required
              />
              <label>Role</label>
              <select
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
              >
                <option value="STUDENT">STUDENT</option>
                <option value="TEACHER">TEACHER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <label>Password (acha ikiwa huna kubadilisha)</label>
              <input
                type="password"
                value={editForm.password}
                onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
              />
              <div className="modal-buttons">
                <button type="submit" className="edit-btn">Save</button>
                <button type="button" className="delete-btn" onClick={() => setEditUser(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;
