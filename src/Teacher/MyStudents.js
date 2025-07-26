import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users/role/student')
      .then(response => {
        // Ondoa duplicates kwa registrationNumber
        const uniqueStudents = response.data.filter((student, index, self) =>
          index === self.findIndex(s => s.registrationNumber === student.registrationNumber)
        );
        setStudents(uniqueStudents);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load students.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>My Students</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{width: '100%', textAlign: 'left'}}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Registration Number</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.fullName}</td>
                <td>{student.email}</td>
                <td>{student.registrationNumber || 'N/A'}</td>
                <td>{student.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyStudent;
