import React, { useState } from 'react';
import axios from 'axios';

const AddQuestionForm = ({ assessmentId, onQuestionAdded }) => {
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setQuestionText('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectOption('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !questionText.trim() ||
      !optionA.trim() ||
      !optionB.trim() ||
      !optionC.trim() ||
      !optionD.trim() ||
      !correctOption
    ) {
      setMessage('❌ Please fill in all fields.');
      return;
    }

    const validOptions = ['A', 'B', 'C', 'D'];
    const correctOptionUpper = correctOption.toUpperCase();
    if (!validOptions.includes(correctOptionUpper)) {
      setMessage('❌ Correct option must be one of A, B, C, or D.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await axios.post('http://192.168.43.33:8080/api/questions', {
        assessmentId: assessmentId,
        content: questionText.trim(),
        imageUrl: null,
        videoUrl: null,
        answers: [
          { label: 'A', content: optionA.trim(), correct: correctOptionUpper === 'A' },
          { label: 'B', content: optionB.trim(), correct: correctOptionUpper === 'B' },
          { label: 'C', content: optionC.trim(), correct: correctOptionUpper === 'C' },
          { label: 'D', content: optionD.trim(), correct: correctOptionUpper === 'D' },
        ],
      });

      setMessage('✅ Question added successfully.');
      resetForm();
      if (onQuestionAdded) onQuestionAdded();
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setMessage('❌ There was an issue submitting the question.');
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label, value, setter) => (
    <div style={{ position: 'relative' }}>
      <span style={styles.optionLabel}>{label}</span>
      <input
        type="text"
        placeholder={`Option ${label}`}
        value={value}
        onChange={(e) => setter(e.target.value)}
        style={styles.inputWithLabel}
        disabled={loading}
      />
    </div>
  );

  return (
    <div style={styles.container}>
      <h2>Add New Question</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        {renderInput('A', optionA, setOptionA)}
        {renderInput('B', optionB, setOptionB)}
        {renderInput('C', optionC, setOptionC)}
        {renderInput('D', optionD, setOptionD)}
        <select
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
          style={{ ...styles.input, cursor: 'pointer' }}
          disabled={loading}
        >
          <option value="">Select Correct Answer</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Question'}
        </button>
      </form>
    </div>
  );
};

export default AddQuestionForm;

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  inputWithLabel: {
    padding: '10px 10px 10px 30px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
  },
  optionLabel: {
    position: 'absolute',
    left: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#333',
  },
  button: {
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    fontSize: '16px',
  },
};
