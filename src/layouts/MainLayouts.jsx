import React, { useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/store/acrions/userActions";
import { useLocation } from "react-router-dom";

const MainLayouts = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.user);
  const location = useLocation();

  // Re-hydrate user profile after page refresh (token survives via localStorage,
  // but user object is in-memory only and gets wiped on reload)
  useEffect(() => {
    if (token && !user) {
      dispatch(getProfile());
    }
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname.includes("/login") || location.pathname.includes("/register") ? null : <Navbar />}
      <main>
        <Outlet />
      </main>
      {location.pathname.includes("/login") || location.pathname.includes("/register") ? null : <Footer />}
    </div>
  );
};

export default MainLayouts;
