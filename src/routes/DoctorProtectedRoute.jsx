import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const DoctorProtectedRoute = () => {
    const { doctorToken } = useSelector((state) => state.doctor);

    return doctorToken ? <Outlet /> : <Navigate to="/doctor/login" />;
};

export default DoctorProtectedRoute;
