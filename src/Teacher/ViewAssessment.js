import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewAssessment = () => {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/assessments/${id}`)
      .then(res => res.json())
      .then(data => setAssessment(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!assessment) {
    return <div>Loading assessment...</div>;
  }

  return (
    <div>
      <h2>Maelezo ya Assessment</h2>
      <p><strong>Jina:</strong> {assessment.title}</p>
      <p><strong>Maelezo:</strong> {assessment.description}</p>
      {/* ongeza vitu vingine utakavyoonyesha */}
    </div>
  );
};

export default ViewAssessment;
