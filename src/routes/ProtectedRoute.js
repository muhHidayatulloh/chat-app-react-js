// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log('protected route');
  if (!user) {
    // Jika tidak ada user yang login, redirect ke halaman login
    return <Navigate to="/" />;
  }

  return children; // Jika user ada, tampilkan komponen anak (halaman yang di-proteksi)
};

export default ProtectedRoute;
