import React, { useState } from 'react';
import LessonList from './LessonList';
import './Lessons.css';

const Lessons = () => {
  const [refreshTrigger] = useState(0); // haina tena handleLessonAdded kwa sababu hatuongezi lessons hapa

  return (
    <div className="lessons-page">
      <h2 className="lessons-title">📚 Orodha ya Mafunzo</h2>

      <div className="lessons-grid">
        <div className="lessons-list full-width">
          <LessonList refresh={refreshTrigger} />
        </div>
      </div>
    </div>
  );
};

export default Lessons;
