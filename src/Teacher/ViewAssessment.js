import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewAssessment = () => {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessmentAndQuestions = async () => {
      try {
        const [assessmentRes, questionsRes] = await Promise.all([
          fetch(`http://localhost:8080/api/assessments/${id}`),
          fetch(`http://localhost:8080/api/questions/by-assessment/${id}`)
        ]);

        const assessmentData = await assessmentRes.json();
        const questionsData = await questionsRes.json();

        console.log("Questions API Response:", questionsData); // 🔍 Log ya kusaidia

        // Hakikisha ni array, hata kama data ni object au null
        const normalizedQuestions = Array.isArray(questionsData) ? questionsData : [];

        setAssessment(assessmentData);
        setQuestions(normalizedQuestions);
      } catch (error) {
        console.error('Error fetching data:', error);
        setQuestions([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchAssessmentAndQuestions();
  }, [id]);

  if (loading) {
    return <div style={{ padding: '20px' }}>Inapakia assessment...</div>;
  }

  if (!assessment) {
    return <div style={{ padding: '20px', color: 'red' }}>Haikuweza kupatikana assessment yenye ID hiyo.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Maelezo ya Assessment</h2>
      <p><strong>Jina:</strong> {assessment.title}</p>
      <p><strong>Maelezo:</strong> {assessment.description || 'Hakuna maelezo.'}</p>

      <h3 style={{ marginTop: '30px' }}>Maswali ya Assessment</h3>
      {questions.length === 0 ? (
        <p style={{ color: 'gray' }}>Hakuna maswali yaliyoongezwa kwenye assessment hii.</p>
      ) : (
        questions.map((question, index) => (
          <div
            key={question.id || index}
            style={{
              marginBottom: '20px',
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <p><strong>Swali {index + 1}:</strong> {question.content || 'Hakuna maelezo ya swali.'}</p>
            <p><strong>Majibu:</strong></p>
            <ul>
              {Array.isArray(question.answers) && question.answers.length > 0 ? (
                question.answers.map(answer => (
                  <li key={answer.id} style={{ marginBottom: '5px' }}>
                    {answer.content}
                    {answer.correct && <strong style={{ color: 'green' }}> ✅ (Sahihi)</strong>}
                  </li>
                ))
              ) : (
                <li style={{ color: 'gray' }}>Hakuna majibu kwa swali hili.</li>
              )}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewAssessment;
