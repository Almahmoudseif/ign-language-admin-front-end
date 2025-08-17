// src/utils/ProtectedRoutes.js
import React from "react";
import { Navigate } from "react-router-dom";

// Protected Route kwa Teacher
export const ProtectedRouteTeacher = ({ children }) => {
  // Soma data ya teacher kutoka localStorage
  const teacherData = JSON.parse(localStorage.getItem("teacher"));

  // Kama hakuna data au role si teacher, rudisha login
  if (!teacherData || teacherData.role?.toLowerCase() !== "teacher") {
    return <Navigate to="/teacher-login" replace />;
  }

  // Onyesha children ikiwa teacher ame-login
  return children;
};

// Protected Route kwa Admin
export const ProtectedRouteAdmin = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Kama hakuna token au role si ADMIN, rudisha login
  if (!token || role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // Onyesha children ikiwa admin ame-login
  return children;
};
