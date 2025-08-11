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

    // Trim inputs
    if (
      !questionText.trim() ||
      !optionA.trim() ||
      !optionB.trim() ||
      !optionC.trim() ||
      !optionD.trim() ||
      !correctOption
    ) {
      setMessage('❌ Tafadhali jaza sehemu zote.');
      return;
    }

    const validOptions = ['A', 'B', 'C', 'D'];
    const correctOptionUpper = correctOption.toUpperCase();
    if (!validOptions.includes(correctOptionUpper)) {
      setMessage('❌ Chaguo sahihi lazima iwe mojawapo kati ya A, B, C au D.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await axios.post('http://192.168.43.33:8080/api/questions', {
        assessment: { id: assessmentId }, // send as object for backend compatibility
        content: questionText.trim(),
        imageUrl: null,
        videoUrl: null,
        answers: [
          { content: optionA.trim(), isCorrect: correctOptionUpper === 'A' },
          { content: optionB.trim(), isCorrect: correctOptionUpper === 'B' },
          { content: optionC.trim(), isCorrect: correctOptionUpper === 'C' },
          { content: optionD.trim(), isCorrect: correctOptionUpper === 'D' },
        ],
      });

      setMessage('✅ Swali limeongezwa kikamilifu.');
      resetForm();

      if (onQuestionAdded) onQuestionAdded();
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setMessage('❌ Kuna tatizo wakati wa kuwasilisha swali.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Ongeza Swali Jipya</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Swali"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Chaguo A"
          value={optionA}
          onChange={(e) => setOptionA(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Chaguo B"
          value={optionB}
          onChange={(e) => setOptionB(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Chaguo C"
          value={optionC}
          onChange={(e) => setOptionC(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Chaguo D"
          value={optionD}
          onChange={(e) => setOptionD(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <select
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
          style={{ ...styles.input, cursor: 'pointer' }}
          disabled={loading}
        >
          <option value="">Chagua Jibu Sahihi</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Inatuma...' : 'Wasilisha Swali'}
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
