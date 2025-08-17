import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-US', options);
};

const AssessmentBuilder = () => {
  const [lessons, setLessons] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedLesson, setSelectedLesson] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('BEGINNER');
  const [date, setDate] = useState('');
  const [questions, setQuestions] = useState([]);

  const [questionContent, setQuestionContent] = useState('');
  const [questionImageUrl, setQuestionImageUrl] = useState('');
  const [questionVideoUrl, setQuestionVideoUrl] = useState('');
  const [answers, setAnswers] = useState([{ content: '', correct: false }]);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get('http://192.168.43.33:8080/api/lessons');
        setLessons(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://192.168.43.33:8080/api/users/students');
        setStudents(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLessons();
    fetchStudents();
  }, []);

  const addAnswerField = () => setAnswers([...answers, { content: '', correct: false }]);
  const removeAnswerField = (index) => {
    if (answers.length === 1) return;
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleAnswerChange = (index, field, value) => {
    const updatedAnswers = [...answers];
    if (field === 'content') updatedAnswers[index].content = value;
    else if (field === 'correct') updatedAnswers.forEach((a, i) => a.correct = i === index ? value : false);
    setAnswers(updatedAnswers);
  };

  const addQuestion = () => {
    setErrorMessage('');
    if (!questionContent.trim()) { setErrorMessage('Enter question content.'); return; }
    if (!answers.some(a => a.correct)) { setErrorMessage('Select one correct answer.'); return; }
    if (answers.some(a => !a.content.trim())) { setErrorMessage('Fill in all answer fields.'); return; }

    setQuestions([...questions, {
      content: questionContent.trim(),
      imageUrl: questionImageUrl.trim() || null,
      videoUrl: questionVideoUrl.trim() || null,
      answers: answers.map(a => ({ content: a.content.trim(), isCorrect: a.correct }))
    }]);

    setQuestionContent('');
    setQuestionImageUrl('');
    setQuestionVideoUrl('');
    setAnswers([{ content: '', correct: false }]);
  };

  const removeQuestion = (index) => setQuestions(questions.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!selectedLesson) { setErrorMessage('Select a lesson.'); return; }
    if (!selectedStudent) { setErrorMessage('Select a student.'); return; }
    if (!title.trim()) { setErrorMessage('Enter assessment title.'); return; }
    if (!description.trim()) { setErrorMessage('Enter assessment description.'); return; }
    if (!date) { setErrorMessage('Select assessment date.'); return; }
    if (questions.length === 0) { setErrorMessage('Add at least one question.'); return; }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      level,
      date,
      lesson: { id: selectedLesson },
      student: { id: selectedStudent },
      questions
    };

    try {
      await axios.post('http://192.168.43.33:8080/api/assessments', payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      setSuccessMessage('Assessment created successfully!');
      setTitle(''); setDescription(''); setLevel('BEGINNER'); setDate('');
      setQuestions([]); setQuestionContent(''); setQuestionImageUrl(''); setQuestionVideoUrl('');
      setAnswers([{ content: '', correct: false }]);
    } catch (error) {
      setErrorMessage('Error occurred: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>Create Assessment</h2>

      {errorMessage && <div style={{ backgroundColor: '#f8d7da', padding: 10, marginBottom: 15, color: '#721c24' }}>{errorMessage}</div>}
      {successMessage && <div style={{ backgroundColor: '#d4edda', padding: 10, marginBottom: 15, color: '#155724' }}>{successMessage}</div>}

      <select value={selectedLesson} onChange={e => setSelectedLesson(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }}>
        <option value="">-- Select Lesson --</option>
        {lessons.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
      </select>

      <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }}>
        <option value="">-- Select Student --</option>
        {students.map(s => <option key={s.id} value={s.id}>{s.fullName} ({s.registrationNumber})</option>)}
      </select>

      <input type="text" placeholder="Assessment Title" value={title} onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }} />

      <textarea placeholder="Assessment Description" value={description} onChange={e => setDescription(e.target.value)}
        rows={3} style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }} />

      <select value={level} onChange={e => setLevel(e.target.value)} style={{ padding: 8, marginBottom: 10, width: '100%', fontSize: 16 }}>
        <option value="BEGINNER">BEGINNER</option>
        <option value="INTERMEDIATE">INTERMEDIATE</option>
        <option value="ADVANCED">ADVANCED</option>
      </select>

      <input type="date" value={date} onChange={e => setDate(e.target.value)}
        style={{ padding: 8, marginBottom: 20, width: '100%', fontSize: 16 }} />

      <hr />
      <h3>Add Question</h3>
      <textarea placeholder="Question Content" value={questionContent} onChange={e => setQuestionContent(e.target.value)}
        rows={3} style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }} />

      <input type="text" placeholder="Image URL (optional)" value={questionImageUrl} onChange={e => setQuestionImageUrl(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }} />

      <input type="text" placeholder="Video URL (optional)" value={questionVideoUrl} onChange={e => setQuestionVideoUrl(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10, fontSize: 16 }} />

      <h4>Answers</h4>
      {answers.map((answer, index) => (
        <div key={index} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
          <input type="text" placeholder="Answer" value={answer.content} onChange={e => handleAnswerChange(index, 'content', e.target.value)}
            style={{ flex: '1', padding: 6, marginRight: 10, fontSize: 16 }} />
          <label style={{ marginRight: 10 }}>
            <input type="checkbox" checked={answer.correct} onChange={e => handleAnswerChange(index, 'correct', e.target.checked)} /> Correct Answer
          </label>
          {answers.length > 1 && <button type="button" onClick={() => removeAnswerField(index)}
            style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 3, cursor: 'pointer' }}>Remove</button>}
        </div>
      ))}

      <button type="button" onClick={addAnswerField}
        style={{ padding: '8px 16px', marginBottom: 20, backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 3, cursor: 'pointer', fontSize: 16 }}>Add Answer</button>

      <button type="button" onClick={addQuestion} disabled={!questionContent.trim() || answers.length === 0}
        style={{ padding: '10px 20px', marginBottom: 20, backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 3, cursor: 'pointer', fontSize: 16 }}>Add This Question</button>

      <hr />
      <h3>Questions ({questions.length})</h3>
      {questions.map((q, i) => (
        <div key={i} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10, borderRadius: 4, backgroundColor: '#f9f9f9' }}>
          <b>Question {i + 1}:</b> {q.content}<br />
          Image: {q.imageUrl || 'None'}<br />
          Video: {q.videoUrl || 'None'}<br />
          Date: {formatDate(date)}<br />
          <ul>{q.answers.map((a, j) => <li key={j}>{a.content} {a.isCorrect ? '(Correct)' : ''}</li>)}</ul>
          <button type="button" onClick={() => removeQuestion(i)}
            style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 3, cursor: 'pointer' }}>Remove Question</button>
        </div>
      ))}

      <hr />
      <button type="button" onClick={handleSubmit}
        disabled={questions.length === 0 || !title.trim() || !description.trim() || !date || !selectedLesson || !selectedStudent}
        style={{
          padding: '15px 30px',
          backgroundColor: questions.length === 0 || !title.trim() || !description.trim() || !date || !selectedLesson || !selectedStudent ? '#6c757d' : '#218838',
          color: 'white',
          fontSize: 16,
          cursor: questions.length === 0 || !title.trim() || !description.trim() || !date || !selectedLesson || !selectedStudent ? 'not-allowed' : 'pointer',
          border: 'none',
          borderRadius: 4,
          width: '100%',
          marginTop: 10
        }}>Save Assessment</button>
    </div>
  );
};

export default AssessmentBuilder;
