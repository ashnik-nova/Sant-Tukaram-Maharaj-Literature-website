// components/AdminLayout.jsx
import React, { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Perform logout logic
    // Then navigate to login or home
    navigate("/admin-login");
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar bg-dark ${collapsed ? 'collapsed' : ''}`} style={{
        width: collapsed ? '80px' : '250px',
        minHeight: '100vh',
        transition: 'width 0.3s',
        color: 'white',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        overflowY: 'auto'
      }}>
        <div className="p-3 d-flex justify-content-between align-items-center">
          {!collapsed && <h4 className="mb-0">Admin Panel</h4>}
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="border-0"
          >
            {collapsed ? '→' : '←'}
          </Button>
        </div>

        <div className="nav flex-column mt-3">
          <NavLink
            to="/admin/dashboard"
            className={`nav-link py-3 ${isActive('/admin/dashboard') ? 'bg-warning text-dark' : 'text-white'}`}
            style={{ textAlign: collapsed ? 'center' : 'left' }}
          >
            {collapsed ? '👤' : 'Manage Users'}
          </NavLink>

          <NavLink
            to="/admin/books"
            className={`nav-link py-3 ${isActive('/admin/books') ? 'bg-warning text-dark' : 'text-white'}`}
            style={{ textAlign: collapsed ? 'center' : 'left' }}
          >
            {collapsed ? '📚' : 'Manage Books'}
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={`nav-link py-3 ${isActive('/admin/categories') ? 'bg-warning text-dark' : 'text-white'}`}
            style={{ textAlign: collapsed ? 'center' : 'left' }}
          >
            {collapsed ? '🗂️' : 'Categories'}
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={`nav-link py-3 ${isActive('/admin/orders') ? 'bg-warning text-dark' : 'text-white'}`}
            style={{ textAlign: collapsed ? 'center' : 'left' }}
          >
            {collapsed ? '🛒' : 'Orders'}
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={`nav-link py-3 ${isActive('/admin/reports') ? 'bg-warning text-dark' : 'text-white'}`}
            style={{ textAlign: collapsed ? 'center' : 'left' }}
          >
            {collapsed ? '📊' : 'Reports'}
          </NavLink>

          <div
            className="nav-link py-3 text-white mt-auto"
            onClick={handleLogout}
            style={{
              cursor: 'pointer',
              textAlign: collapsed ? 'center' : 'left',
              marginTop: '50px'
            }}
          >
            {collapsed ? '🚪' : 'Logout'}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div style={{
        marginLeft: collapsed ? '80px' : '250px',
        width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 250px)',
        transition: 'margin-left 0.3s, width 0.3s',
        padding: '20px'
      }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
