import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Admin Components
import AdminLoginPage from './components/AdminLoginPage';
import AdminDashboard from './components/AdminDashboard';
import DashboardHome from './components/DashboardHome';
import Teachers from './components/Teachers';
import Lessons from './components/Lessons';
import Assessments from './components/Assessments';
import AdminResults from './components/AdminResults';

// Teacher Components
import TeacherLoginPage from './Teacher/TeacherLoginPage';
import TeacherRegisterPage from './Teacher/TeacherRegisterPage';
import TeacherDashboard from './Teacher/TeacherDashboard';

// Protected Routes
import { ProtectedRouteTeacher, ProtectedRouteAdmin } from './utils/ProtectedRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/" element={<AdminLoginPage />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRouteAdmin>
              <AdminDashboard />
            </ProtectedRouteAdmin>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="lessons" element={<Lessons />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="results" element={<AdminResults />} />
        </Route>

        {/* Teacher Auth Routes */}
        <Route path="/teacher-login" element={<TeacherLoginPage />} />
        <Route path="/teacher-register" element={<TeacherRegisterPage />} />

        {/* Teacher Dashboard Routes */}
        <Route
          path="/teacher-dashboard/*"
          element={
            <ProtectedRouteTeacher>
              <TeacherDashboard />
            </ProtectedRouteTeacher>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
