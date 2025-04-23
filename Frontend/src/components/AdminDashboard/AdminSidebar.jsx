import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => (
  <div className="sidebar bg-dark text-white p-3" style={{ height: "100vh", width: "250px" }}>
    <h4 className="mb-4">Admin Panel</h4>
    <NavLink to="/admin" className="d-block text-white mb-2">Dashboard Home</NavLink>
    <NavLink to="/admin/users" className="d-block text-white mb-2">Manage Users</NavLink>
    <NavLink to="/admin/books" className="d-block text-white mb-2">Manage Books</NavLink>
    <NavLink to="/admin/data" className="d-block text-white mb-2">Manage Data</NavLink>
  </div>
);

export default AdminSidebar;
