import React, { useState } from 'react';

const MyExams = () => {
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExam({ ...newExam, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newExam.title || !newExam.description || !newExam.deadline) {
      alert('Please fill all fields');
      return;
    }

    setExams([...exams, newExam]);

    setNewExam({
      title: '',
      description: '',
      deadline: '',
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Exams</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Exam Title"
          value={newExam.title}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Exam Description"
          value={newExam.description}
          onChange={handleChange}
          style={styles.textarea}
          rows={3}
        ></textarea>
        <input
          type="date"
          name="deadline"
          value={newExam.deadline}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Create Exam</button>
      </form>

      <div style={styles.examList}>
        {exams.length === 0 ? (
          <p>No exams created yet.</p>
        ) : (
          exams.map((exam, index) => (
            <div key={index} style={styles.examCard}>
              <h3>{exam.title}</h3>
              <p>{exam.description}</p>
              <p><strong>Deadline:</strong> {exam.deadline}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '30px',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  button: {
    padding: '12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  examList: {
    marginTop: '20px',
  },
  examCard: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    marginBottom: '15px',
  },
};

export default MyExams;
