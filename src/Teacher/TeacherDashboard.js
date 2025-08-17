import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";

// Import components
import Lessons from "./MyLessons";
import LessonUploadForm from "./LessonUploadForm";
import TeacherLessonUploadImage from "./TeacherLessonUploadImage";
import LessonImageList from "./LessonImageList";
import VideoUploadOnly from "./VideoUploadOnly"; // default import
import LessonVideoList from "./LessonVideoList";
import MyExams from "./MyExams";
import MyResults from "./MyResults";
import MyStudents from "./MyStudents";
import MyAssessments from "./MyAssessments";
import AllAssessments from "./AllAssessments";
import CreateAssessment from "./CreateAssessment";
import AddQuestionForm from "./AddQuestionForm";
import EditLessonsList from "./EditLessonsList";
import AssessmentBuilder from "./AssessmentBuilder";
import TeacherAssessmentDetail from "./TeacherAssessmentDetail"; // ✅ umeongeza hii

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("teacher");
    if (stored) setTeacher(JSON.parse(stored));
    else navigate("/teacher-login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    navigate("/teacher-login");
  };

  const navStyle = ({ isActive }) =>
    isActive
      ? { ...styles.menuItem, ...styles.activeMenuItem }
      : styles.menuItem;

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Teacher Panel</h2>
        <ul style={styles.menu}>
          <li><NavLink to="/teacher-dashboard/lessons" style={navStyle}>📚 Lessons</NavLink></li>
          <li><NavLink to="/teacher-dashboard/upload-lesson" style={navStyle}>⬆️ Upload Lesson</NavLink></li>
          <li><NavLink to="/teacher-dashboard/upload-lesson-image" style={navStyle}>🖼️ Upload Lesson Image</NavLink></li>
          <li><NavLink to="/teacher-dashboard/lesson-images" style={navStyle}>📷 View Lesson Images</NavLink></li>
          <li><NavLink to="/teacher-dashboard/upload-video" style={navStyle}>📹 Upload Video</NavLink></li>
          <li><NavLink to="/teacher-dashboard/lesson-videos" style={navStyle}>📺 View Lesson Videos</NavLink></li>
          <li><NavLink to="/teacher-dashboard/exams" style={navStyle}>📝 Exams</NavLink></li>
          <li><NavLink to="/teacher-dashboard/results" style={navStyle}>📊 Results</NavLink></li>
          <li><NavLink to="/teacher-dashboard/students" style={navStyle}>👥 My Students</NavLink></li>
          <li><NavLink to="/teacher-dashboard/assessments" style={navStyle}>📂 Assessments</NavLink></li>
          <li><NavLink to="/teacher-dashboard/all-assessments" style={navStyle}>📋 All Assessments</NavLink></li>
          <li><NavLink to="/teacher-dashboard/create-assessment" style={navStyle}>➕ Create Assessment</NavLink></li>
          <li><NavLink to="/teacher-dashboard/add-question" style={navStyle}>➕ Add Question</NavLink></li>
          <li><NavLink to="/teacher-dashboard/edit-lessons" style={navStyle}>✏️ Edit Lessons List</NavLink></li>
          <li><NavLink to="/teacher-dashboard/assessment-builder" style={navStyle}>🛠️ Assessment Builder</NavLink></li>
          <li onClick={handleLogout} style={{ ...styles.menuItem, cursor: "pointer" }}>🚪 Logout</li>
        </ul>
      </div>

      {/* Main content */}
      <div style={styles.content}>
        <h3>Welcome, {teacher?.fullName || "Teacher"}</h3>
        <Routes>
          <Route path="lessons" element={<Lessons />} />
          <Route path="upload-lesson" element={<LessonUploadForm />} />
          <Route path="upload-lesson-image" element={<TeacherLessonUploadImage />} />
          <Route path="lesson-images" element={<LessonImageList />} />
          <Route path="upload-video" element={<VideoUploadOnly />} />
          <Route path="lesson-videos" element={<LessonVideoList />} />
          <Route path="exams" element={<MyExams />} />
          <Route path="results" element={<MyResults />} />
          <Route path="students" element={<MyStudents />} />
          <Route path="assessments" element={<MyAssessments />} />
          <Route path="all-assessments" element={<AllAssessments />} />
          <Route path="create-assessment" element={<CreateAssessment />} />
          <Route path="add-question" element={<AddQuestionForm />} />
          <Route path="edit-lessons" element={<EditLessonsList />} />
          <Route path="assessment-builder" element={<AssessmentBuilder />} />
          <Route path="assessment/:assessmentId" element={<TeacherAssessmentDetail />} /> {/* ✅ umeongeza route hii */}
          <Route index element={<h2>Select an option from sidebar</h2>} />
        </Routes>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", height: "100vh", backgroundColor: "#f8f9fa" },
  sidebar: { width: "250px", backgroundColor: "#343a40", color: "#fff", padding: "20px" },
  logo: { fontSize: "20px", marginBottom: "30px", textAlign: "center" },
  menu: { listStyleType: "none", padding: 0 },
  menuItem: {
    display: "block",
    padding: "12px 10px",
    marginBottom: "10px",
    backgroundColor: "#495057",
    borderRadius: "6px",
    userSelect: "none",
    color: "white",
    textDecoration: "none",
    transition: "background-color 0.3s",
  },
  activeMenuItem: { backgroundColor: "#007bff", fontWeight: "bold" },
  content: { flex: 1, padding: "20px", overflowY: "auto" },
};

export default TeacherDashboard;
