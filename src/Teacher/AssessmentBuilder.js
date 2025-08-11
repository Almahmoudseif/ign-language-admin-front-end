import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AssessmentBuilder = ({ lessonId, studentId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('BEGINNER');
  const [date, setDate] = useState('');
  const [questions, setQuestions] = useState([]);

  // Current question state
  const [questionContent, setQuestionContent] = useState('');
  const [questionImageUrl, setQuestionImageUrl] = useState('');
  const [questionVideoUrl, setQuestionVideoUrl] = useState('');
  const [answers, setAnswers] = useState([{ content: '', correct: false }]);

  // Messages for user feedback
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Add new empty answer field
  const addAnswerField = () => {
    setAnswers([...answers, { content: '', correct: false }]);
  };

  // Remove answer field
  const removeAnswerField = (index) => {
    if (answers.length === 1) return;
    setAnswers(answers.filter((_, i) => i !== index));
  };

  // Handle answer content or correctness changes
  const handleAnswerChange = (index, field, value) => {
    const updatedAnswers = [...answers];

    if (field === 'content') {
      updatedAnswers[index].content = value;
    } else if (field === 'correct') {
      // Ensure only one correct answer is selected
      updatedAnswers.forEach((a, i) => {
        a.correct = i === index ? value : false;
      });
    }
    setAnswers(updatedAnswers);
  };

  // Add current question to questions list
  const addQuestion = () => {
    setErrorMessage('');
    if (!questionContent.trim()) {
      setErrorMessage('Andika maudhui ya swali.');
      return;
    }
    if (!answers.some(a => a.correct)) {
      setErrorMessage('Chagua jibu sahihi moja.');
      return;
    }
    if (answers.some(a => !a.content.trim())) {
      setErrorMessage('Jaza maudhui ya majibu yote.');
      return;
    }

    setQuestions([
      ...questions,
      {
        content: questionContent.trim(),
        imageUrl: questionImageUrl.trim() || null,
        videoUrl: questionVideoUrl.trim() || null,
        answers: answers.map(a => ({
          content: a.content.trim(),
          isCorrect: a.correct,
        })),
      }
    ]);

    // Reset current question inputs
    setQuestionContent('');
    setQuestionImageUrl('');
    setQuestionVideoUrl('');
    setAnswers([{ content: '', correct: false }]);
    setErrorMessage('');
  };

  // Remove question from list
  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Submit full assessment
  const handleSubmit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!title.trim()) {
      setErrorMessage('Weka kichwa cha assessment.');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Weka maelezo ya assessment.');
      return;
    }
    if (!date) {
      setErrorMessage('Chagua tarehe ya assessment.');
      return;
    }
    if (!lessonId) {
      setErrorMessage('Lesson ID haijatolewa.');
      return;
    }
    if (!studentId) {
      setErrorMessage('Student ID haijatolewa.');
      return;
    }
    if (questions.length === 0) {
      setErrorMessage('Ongeza angalau swali moja.');
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      level,
      date,
      lesson: { id: lessonId },
      student: { id: studentId },
      questions,
    };

    try {
      await axios.post('http://192.168.43.33:8080/api/assessments', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccessMessage('Assessment imeundwa kikamilifu!');
      // Reset all fields
      setTitle('');
      setDescription('');
      setLevel('BEGINNER');
      setDate('');
      setQuestions([]);
      setQuestionContent('');
      setQuestionImageUrl('');
      setQuestionVideoUrl('');
      setAnswers([{ content: '', correct: false }]);
    } catch (error) {
      setErrorMessage('Kosa limejitokeza: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>Unda Assessment</h2>

      {errorMessage && (
        <div style={{ backgroundColor: '#f8d7da', padding: 10, marginBottom: 15, color: '#721c24' }}>
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div style={{ backgroundColor: '#d4edda', padding: 10, marginBottom: 15, color: '#155724' }}>
          {successMessage}
        </div>
      )}

      <input
        type="text"
        placeholder="Kichwa cha Assessment"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }}
      />

      <textarea
        placeholder="Maelezo ya Assessment"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={3}
        style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }}
      />

      <select
        value={level}
        onChange={e => setLevel(e.target.value)}
        style={{ padding: 8, marginBottom: 10, width: '100%', fontSize: 16 }}
      >
        <option value="BEGINNER">BEGINNER</option>
        <option value="INTERMEDIATE">INTERMEDIATE</option>
        <option value="ADVANCED">ADVANCED</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={{ padding: 8, marginBottom: 20, width: '100%', fontSize: 16 }}
      />

      <hr />
      <h3>Ongeza Swali</h3>

      <textarea
        placeholder="Maudhui ya Swali"
        value={questionContent}
        onChange={e => setQuestionContent(e.target.value)}
        rows={3}
        style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }}
      />

      <input
        type="text"
        placeholder="URL ya Picha (optional)"
        value={questionImageUrl}
        onChange={e => setQuestionImageUrl(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }}
      />

      <input
        type="text"
        placeholder="URL ya Video (optional)"
        value={questionVideoUrl}
        onChange={e => setQuestionVideoUrl(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }}
      />

      <h4>Majibu</h4>
      {answers.map((answer, index) => (
        <div key={index} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Jibu"
            value={answer.content}
            onChange={e => handleAnswerChange(index, 'content', e.target.value)}
            style={{ flex: '1', padding: 6, marginRight: 10, fontSize: 16 }}
          />
          <label style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={answer.correct}
              onChange={e => handleAnswerChange(index, 'correct', e.target.checked)}
            /> Jibu Sahihi
          </label>
          {answers.length > 1 && (
            <button
              type="button"
              onClick={() => removeAnswerField(index)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: 3,
                cursor: 'pointer'
              }}
            >
              Ondoa
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addAnswerField}
        style={{
          padding: '8px 16px',
          marginBottom: 20,
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: 3,
          cursor: 'pointer',
          fontSize: 16
        }}
      >
        Ongeza Jibu
      </button>

      <button
        type="button"
        onClick={addQuestion}
        disabled={!questionContent.trim() || answers.length === 0}
        style={{
          padding: '10px 20px',
          marginBottom: 20,
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: 3,
          cursor: 'pointer',
          fontSize: 16
        }}
      >
        Ongeza Swali Hii
      </button>

      <hr />
      <h3>Maswali ({questions.length})</h3>
      {questions.map((q, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #ccc',
            padding: 10,
            marginBottom: 10,
            borderRadius: 4,
            backgroundColor: '#f9f9f9'
          }}
        >
          <b>Swali {i + 1}:</b> {q.content}
          <br />
          Picha: {q.imageUrl || 'Hakuna'}
          <br />
          Video: {q.videoUrl || 'Hakuna'}
          <br />
          <ul>
            {q.answers.map((a, j) => (
              <li key={j}>
                {a.content} {a.isCorrect ? '(Sahihi)' : ''}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => removeQuestion(i)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: 3,
              cursor: 'pointer'
            }}
          >
            Ondoa Swali
          </button>
        </div>
      ))}

      <hr />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={questions.length === 0 || !title.trim() || !description.trim() || !date || !lessonId || !studentId}
        style={{
          padding: '15px 30px',
          backgroundColor: questions.length === 0 || !title.trim() || !description.trim() || !date || !lessonId || !studentId ? '#6c757d' : '#218838',
          color: 'white',
          fontSize: 16,
          cursor: questions.length === 0 || !title.trim() || !description.trim() || !date || !lessonId || !studentId ? 'not-allowed' : 'pointer',
          border: 'none',
          borderRadius: 4,
          width: '100%',
          marginTop: 10
        }}
      >
        Hifadhi Assessment
      </button>
    </div>
  );
};

AssessmentBuilder.propTypes = {
  lessonId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default AssessmentBuilder;
