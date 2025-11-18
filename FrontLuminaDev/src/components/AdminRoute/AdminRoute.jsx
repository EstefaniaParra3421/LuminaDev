import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user || user.rol !== 'administrador') {
    return <Navigate to="/admin123" replace />;
  }

  return children;
};

export default AdminRoute;

