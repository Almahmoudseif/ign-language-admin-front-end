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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionText || !optionA || !optionB || !optionC || !optionD || !correctOption) {
      setMessage('❌ Tafadhali jaza sehemu zote.');
      return;
    }

    const correctOptionUpper = correctOption.toUpperCase();
    if (!['A', 'B', 'C', 'D'].includes(correctOptionUpper)) {
      setMessage('❌ Chaguo sahihi lazima iwe mojawapo kati ya A, B, C au D.');
      return;
    }

    try {
      await axios.post('http://192.168.43.33:8080/api/questions', {
        assessmentId,
        content: questionText,
        imageUrl: null,
        videoUrl: null,
        answers: [
          { content: optionA, correct: correctOptionUpper === 'A' },
          { content: optionB, correct: correctOptionUpper === 'B' },
          { content: optionC, correct: correctOptionUpper === 'C' },
          { content: optionD, correct: correctOptionUpper === 'D' },
        ],
      });

      setMessage('✅ Swali limeongezwa kikamilifu.');
      setQuestionText('');
      setOptionA('');
      setOptionB('');
      setOptionC('');
      setOptionD('');
      setCorrectOption('');

      if (onQuestionAdded) {
        onQuestionAdded();
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setMessage('❌ Kuna tatizo wakati wa kuwasilisha swali.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Ongeza Swali Jipya</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Swali" value={questionText} onChange={(e) => setQuestionText(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Chaguo A" value={optionA} onChange={(e) => setOptionA(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Chaguo B" value={optionB} onChange={(e) => setOptionB(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Chaguo C" value={optionC} onChange={(e) => setOptionC(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Chaguo D" value={optionD} onChange={(e) => setOptionD(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Chaguo Sahihi (A - D)" value={correctOption} onChange={(e) => setCorrectOption(e.target.value)} style={styles.input} />
        <button type="submit" style={styles.button}>Wasilisha Swali</button>
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
  },
  button: {
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
  },
};
