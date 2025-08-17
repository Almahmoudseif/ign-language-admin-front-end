import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddQuestionForm from './AddQuestionForm';
import axios from 'axios';

const TeacherAssessmentDetail = () => {
  const { assessmentId } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [questions, setQuestions] = useState([]);

  const fetchAssessment = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/assessments/${assessmentId}`);
      setAssessment(res.data);
    } catch (err) {
      console.error('Error fetching assessment:', err);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/questions/assessment/${assessmentId}`);
      setQuestions(res.data);
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  useEffect(() => {
    fetchAssessment();
    fetchQuestions();
  }, [assessmentId]);

  return (
    <div style={styles.container}>
      <h2>Assessment Details</h2>
      {assessment ? (
        <div style={styles.card}>
          <p><strong>Title:</strong> {assessment.title}</p>
          <p><strong>Description:</strong> {assessment.description}</p>
          <p><strong>Level:</strong> {assessment.level}</p>
          <p><strong>Date:</strong> {assessment.date}</p>
        </div>
      ) : (
        <p>Loading assessment...</p>
      )}

      <hr />

      <AddQuestionForm assessmentId={assessmentId} onQuestionAdded={fetchQuestions} />

      <h3>Existing Questions</h3>
      {questions.length === 0 ? (
        <p>No questions added yet.</p>
      ) : (
        <ul>
          {questions.map((q, index) => (
            <li key={q.id} style={styles.question}>
              <strong>{index + 1}. {q.content}</strong>
              <ul>
                {q.answers.map((a) => (
                  <li key={a.id}>
                    {a.content} {a.correct && <span style={{ color: 'green' }}>✅</span>}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  card: {
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  question: {
    marginBottom: '15px',
  },
};

export default TeacherAssessmentDetail;
