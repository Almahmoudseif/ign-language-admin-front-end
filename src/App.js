import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Admin Components
import AdminLoginPage from './components/AdminLoginPage';
import AdminDashboard from './components/AdminDashboard';
import DashboardHome from './components/DashboardHome';
import Teachers from './components/Teachers';
import Lessons from './components/Lessons';
import Assessments from './components/Assessments';
import Results from './components/Results';

// Teacher Components
import TeacherLoginPage from './Teacher/TeacherLoginPage';
import TeacherRegisterPage from './Teacher/TeacherRegisterPage';
import TeacherDashboard from './Teacher/TeacherDashboard';
import MyLessons from './Teacher/MyLessons';
import MyExams from './Teacher/MyExams';
import MyResults from './Teacher/MyResults';
import MyStudents from './Teacher/MyStudents';
import MyAssessments from './Teacher/MyAssessments';
import TeacherLessonUpload from './Teacher/TeacherLessonUpload';
import TeacherLessonUploadImage from './Teacher/TeacherLessonUploadImage';
import CreateAssessment from './Teacher/CreateAssessment';
import AddQuestionForm from './Teacher/AddQuestionForm';
import LessonImageList from './Teacher/LessonImageList';
import TeacherAssessmentDetail from './Teacher/TeacherAssessmentDetail'; // ✅ Hii umeongezwa

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="lessons" element={<Lessons />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="results" element={<Results />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher-login" element={<TeacherLoginPage />} />
        <Route path="/teacher-register" element={<TeacherRegisterPage />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />}>
          <Route index element={<Navigate to="/teacher-dashboard/lessons" replace />} />
          <Route path="lessons" element={<MyLessons />} />
          <Route path="upload-lesson" element={<TeacherLessonUpload />} />
          <Route path="upload-lesson-image" element={<TeacherLessonUploadImage />} />
          <Route path="exams" element={<MyExams />} />
          <Route path="results" element={<MyResults />} />
          <Route path="students" element={<MyStudents />} />
          <Route path="assessments" element={<MyAssessments />} />
          <Route path="create-assessment" element={<CreateAssessment />} />
          <Route path="assessment/:assessmentId" element={<TeacherAssessmentDetail />} /> {/* ✅ New */}
          <Route path="lesson-images" element={<LessonImageList />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
