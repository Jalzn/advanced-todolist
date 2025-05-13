import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, logginIn } = useAuth();

  if (logginIn) return <div>Carregando...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
