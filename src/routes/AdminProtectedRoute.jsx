import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminProtectedRoute() {
  const token = useSelector((state) => state.admin.token);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
