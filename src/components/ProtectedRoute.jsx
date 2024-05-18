import React from "react";
import { useUserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  if (!user) return <Navigate to={"/"} />;

  return children;
};

export default ProtectedRoute;
