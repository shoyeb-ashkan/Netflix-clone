import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { AuthContextProvider } from "../context/AuthContext";

const Layout = () => {
  return (
    <AuthContextProvider>
      <Navbar />
      <Outlet />
    </AuthContextProvider>
  );
};

export default Layout;
