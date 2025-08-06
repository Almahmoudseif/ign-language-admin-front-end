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
import LessonUploadForm from './Teacher/LessonUploadForm';
import TeacherLessonUploadImage from './Teacher/TeacherLessonUploadImage';
import CreateAssessment from './Teacher/CreateAssessment';
import AddQuestionForm from './Teacher/AddQuestionForm';
import LessonImageList from './Teacher/LessonImageList';
import LessonVideoList from './Teacher/LessonVideoList';
import TeacherAssessmentDetail from './Teacher/TeacherAssessmentDetail';
import EditLessonsList from './Teacher/EditLessonsList';
import EditLessonPage from './Teacher/EditLessonPage';
import { VideoUploadOnly } from './Teacher/TeacherDashboard';

import AssessmentBuilder from './Teacher/AssessmentBuilder';
import AllAssessments from './Teacher/AllAssessments';
import EditAssessment from './Teacher/EditAssessment';
import ViewAssessment from './Teacher/ViewAssessment';

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

        {/* Teacher Auth Routes */}
        <Route path="/teacher-login" element={<TeacherLoginPage />} />
        <Route path="/teacher-register" element={<TeacherRegisterPage />} />

        {/* Teacher Dashboard Routes */}
        <Route path="/teacher-dashboard" element={<TeacherDashboard />}>
          <Route index element={<Navigate to="lessons" replace />} />
          <Route path="lessons" element={<MyLessons />} />
          <Route path="upload-lesson" element={<LessonUploadForm />} />
          <Route path="upload-lesson-image" element={<TeacherLessonUploadImage />} />
          <Route path="lesson-images" element={<LessonImageList />} />
          <Route path="lesson-videos" element={<LessonVideoList />} />
          <Route path="exams" element={<MyExams />} />
          <Route path="results" element={<MyResults />} />
          <Route path="students" element={<MyStudents />} />
          <Route path="assessments" element={<MyAssessments />} />
          <Route path="create-assessment" element={<CreateAssessment />} />
          <Route path="assessment/:assessmentId" element={<TeacherAssessmentDetail />} />
          <Route path="add-question" element={<AddQuestionForm />} />
          <Route path="edit-lessons" element={<EditLessonsList />} />
          <Route path="edit-lesson/:id" element={<EditLessonPage />} />
          <Route path="upload-video" element={<VideoUploadOnly />} />
          <Route path="edit-assessment/:id" element={<EditAssessment />} />
          <Route path="view-assessment/:id" element={<ViewAssessment />} />
          <Route path="assessment-builder" element={<AssessmentBuilder />} />
          <Route path="all-assessments" element={<AllAssessments />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
