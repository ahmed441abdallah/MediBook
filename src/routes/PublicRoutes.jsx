import MainLayouts from "@/layouts/MainLayouts";
import AboutPage from "@/pages/About";
import LandingPage from "@/pages/Landing/LandingPage";
import RegisterPage from "@/pages/Register";
import LoginPage from "@/pages/Login";
import AdminLoginPage from "@/pages/AdminLogin";
import DoctorsPage from "@/pages/Doctors";
import DoctorDetailPage from "@/pages/Doctors/DoctorDetail";
import React from "react";
import ProfilePage from "@/pages/UserProfile";
import BlogPage from "@/pages/Blog";
import DoctorLoginPage from "@/pages/DoctorLogin";

export const PublicRoutes = {
  element: <MainLayouts />,
  children: [
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/admin/login",
      element: <AdminLoginPage />,
    },
    {
      path: "/doctor/login",
      element: <DoctorLoginPage />,
    },
    {
      path: "/doctors",
      element: <DoctorsPage />,
    },
    {
      path: "/doctors/:id",
      element: <DoctorDetailPage />,

    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/blog",
      element: <BlogPage />,
    }
  ],
};
