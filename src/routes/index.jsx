import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/Admin";
import { AllDoctors } from "@/pages/Admin/AllDoctors";
import { AddDoctor } from "@/pages/Admin/AddDoctor";
import { Appointments } from "@/pages/Admin/Appointments";
import DoctorProtectedRoute from "./DoctorProtectedRoute";
import DoctorLayout from "@/layouts/DoctorLayout";
import DoctorDashboard from "@/pages/DoctorDashboard";
import DoctorAppointments from "@/pages/DoctorDashboard/Appointments";
import DoctorProfile from "@/pages/DoctorDashboard/Profile";

const AdminRoutes = {
  element: <AdminProtectedRoute />,
  children: [
    {
      element: <AdminLayout />,
      children: [
        { path: "/admin", element: <AdminDashboard /> },
        { path: "/admin/all-doctors", element: <AllDoctors /> },
        { path: "/admin/add-doctor", element: <AddDoctor /> },
        { path: "/admin/appointments", element: <Appointments /> },
      ],
    },
  ],
};

const DoctorRoutes = {
  element: <DoctorProtectedRoute />,
  children: [
    {
      element: <DoctorLayout />,
      children: [
        { path: "/doctor-dashboard", element: <DoctorDashboard /> },
        { path: "/doctor-dashboard/appointments", element: <DoctorAppointments /> },
        { path: "/doctor-dashboard/profile", element: <DoctorProfile /> },
      ],
    },
  ],
};

export const router = createBrowserRouter([PublicRoutes, AdminRoutes, DoctorRoutes]);
