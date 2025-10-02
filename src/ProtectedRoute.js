import React from "react";
import { Navigate } from "react-router-dom";

// Check user auth
const isAuthenticated = () => !!localStorage.getItem("token");
const isAdminAuthenticated = () => localStorage.getItem("role") === "admin";

// ------------------ User Protected Route ------------------
export const ProtectedRoute = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  }
  return <Navigate to="/signin" replace />;
};

// ------------------ Admin Protected Route ------------------
export const AdminProtectedRoute = ({ children }) => {
  if (isAdminAuthenticated()) {
    return children;
  }
  return <Navigate to="/admin/login" replace />;
};