import React, { useState } from 'react';
import axios from 'axios';

const AssessmentBuilder = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('BEGINNER');
  const [date, setDate] = useState('');

  const [questions, setQuestions] = useState([]);

  const [questionContent, setQuestionContent] = useState('');
  const [questionImageUrl, setQuestionImageUrl] = useState('');
  const [questionVideoUrl, setQuestionVideoUrl] = useState('');
  const [answers, setAnswers] = useState([{ content: '', correct: false }]);

  const addAnswerField = () => {
    setAnswers([...answers, { content: '', correct: false }]);
  };

  const removeAnswerField = (index) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswers(newAnswers);
  };

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = [...answers];
    if (field === 'content') {
      newAnswers[index].content = value;
    } else if (field === 'correct') {
      newAnswers[index].correct = value;
    }
    setAnswers(newAnswers);
  };

  const addQuestion = () => {
    if (!questionContent.trim()) {
      alert('Tafadhali weka maudhui ya swali.');
      return;
    }
    if (!answers.some(a => a.correct)) {
      alert('Tafadhali chagua jibu sahihi moja.');
      return;
    }
    if (answers.some(a => !a.content.trim())) {
      alert('Tafadhali jaza maudhui ya majibu yote.');
      return;
    }

    setQuestions([
      ...questions,
      {
        content: questionContent,
        imageUrl: questionImageUrl,
        videoUrl: questionVideoUrl,
        answers: answers,
      },
    ]);

    setQuestionContent('');
    setQuestionImageUrl('');
    setQuestionVideoUrl('');
    setAnswers([{ content: '', correct: false }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Tafadhali weka kichwa cha assessment.');
      return;
    }
    if (!description.trim()) {
      alert('Tafadhali weka maelezo ya assessment.');
      return;
    }
    if (!date) {
      alert('Tafadhali chagua tarehe.');
      return;
    }
    if (questions.length === 0) {
      alert('Tafadhali ongeza angalau swali moja.');
      return;
    }

    const payload = {
      title,
      description,
      level,
      date,
      questions,
    };

    try {
      const response = await axios.post('http://192.168.43.33:8080/api/assessments', payload);

      alert('Assessment imeundwa kikamilifu!');
      setTitle('');
      setDescription('');
      setLevel('BEGINNER');
      setDate('');
      setQuestions([]);
    } catch (error) {
      alert('Kosa limejitokeza: ' + error.message);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h2>Unda Assessment</h2>

      <div>
        <label>Kichwa cha Assessment:</label><br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Andika kichwa"
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
      </div>

      <div>
        <label>Maelezo:</label><br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Andika maelezo"
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
          rows={3}
        />
      </div>

      <div>
        <label>Level:</label><br />
        <select value={level} onChange={(e) => setLevel(e.target.value)} style={{ padding: 8, marginBottom: 10 }}>
          <option value="BEGINNER">BEGINNER</option>
          <option value="INTERMEDIATE">INTERMEDIATE</option>
          <option value="ADVANCED">ADVANCED</option>
        </select>
      </div>

      <div>
        <label>Tarehe:</label><br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: 8, marginBottom: 20 }}
        />
      </div>

      <hr />
      <h3>Ongeza Swali</h3>

      <div>
        <label>Maudhui ya Swali:</label><br />
        <textarea
          value={questionContent}
          onChange={(e) => setQuestionContent(e.target.value)}
          rows={3}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
          placeholder="Andika swali"
        />
      </div>

      <div>
        <label>URL ya Picha (optional):</label><br />
        <input
          type="text"
          value={questionImageUrl}
          onChange={(e) => setQuestionImageUrl(e.target.value)}
          placeholder="http://example.com/image.jpg"
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
      </div>

      <div>
        <label>URL ya Video (optional):</label><br />
        <input
          type="text"
          value={questionVideoUrl}
          onChange={(e) => setQuestionVideoUrl(e.target.value)}
          placeholder="http://example.com/video.mp4"
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
      </div>

      <h4>Majibu</h4>
      {answers.map((answer, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <input
            type="text"
            placeholder="Jibu"
            value={answer.content}
            onChange={(e) => handleAnswerChange(index, 'content', e.target.value)}
            style={{ width: '70%', padding: 6, marginRight: 10 }}
          />
          <label>
            <input
              type="checkbox"
              checked={answer.correct}
              onChange={(e) => handleAnswerChange(index, 'correct', e.target.checked)}
            />
            {' '}Jibu Sahihi
          </label>
          {answers.length > 1 && (
            <button onClick={() => removeAnswerField(index)} style={{ marginLeft: 10 }}>
              Ondoa
            </button>
          )}
        </div>
      ))}
      <button onClick={addAnswerField} style={{ marginBottom: 20 }}>Ongeza Jibu</button>

      <div>
        <button onClick={addQuestion} style={{ padding: '10px 20px', marginBottom: 30 }}>
          Ongeza Swali Hii
        </button>
      </div>

      <hr />
      <h3>Maswali yaliyoongezwa ({questions.length})</h3>
      {questions.map((q, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <b>Swali {index + 1}:</b> {q.content}<br />
          Picha: {q.imageUrl || 'Hakuna'}<br />
          Video: {q.videoUrl || 'Hakuna'}<br />
          <ul>
            {q.answers.map((a, i) => (
              <li key={i}>
                {a.content} {a.correct ? '(Sahihi)' : ''}
              </li>
            ))}
          </ul>
          <button onClick={() => removeQuestion(index)}>Ondoa Swali Hili</button>
        </div>
      ))}

      <hr />
      <button
        onClick={handleSubmit}
        style={{ padding: '15px 30px', fontSize: 16, backgroundColor: 'green', color: 'white', cursor: 'pointer' }}
      >
        Hifadhi Assessment
      </button>
    </div>
  );
};

export default AssessmentBuilder;
