import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://192.168.43.33:8080/api/lessons')
      .then(res => {
        setLessons(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching lessons:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading lessons...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Lessons</h2>
      {lessons.length === 0 ? (
        <p>No lessons found.</p>
      ) : (
        lessons.map(lesson => (
          <div key={lesson.id} style={styles.card}>
            <h3>{lesson.title}</h3>
            <p><strong>Description:</strong> {lesson.description}</p>
            <p><strong>Level:</strong> {lesson.level}</p>
            {lesson.videoPath ? (
              <video width="320" height="240" controls>
                <source
                  src={`http://192.168.43.33:8080/${lesson.videoPath}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>No video uploaded.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '20px',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
  }
};

export default MyLessons;
