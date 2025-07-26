import React, { useState } from 'react';
import AddLessonForm from './AddLessonForm';
import LessonList from './LessonList';
import './Lessons.css'; // <-- CSS import

const Lessons = () => {
  const [refresh, setRefresh] = useState(false);

  const handleLessonAdded = () => {
    setRefresh(prev => !prev); // re-render LessonList
  };

  return (
    <div className="lessons-container">
      <h2 className="lessons-heading">Usimamizi wa Mafunzo</h2>
      <div className="lessons-content">
        <AddLessonForm onLessonAdded={handleLessonAdded} />
        <LessonList key={refresh} />
      </div>
    </div>
  );
};

export default Lessons;
