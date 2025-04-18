import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import DashboardHome from "./DashboardHome";
import ManageUsers from "./ManageUsers";
import ManageBooks from "./ManageBooks";
import ManageData from "./ManageData";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard d-flex">
      <AdminSidebar />
      <div className="p-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/books" element={<ManageBooks />} />
          <Route path="/data" element={<ManageData />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
