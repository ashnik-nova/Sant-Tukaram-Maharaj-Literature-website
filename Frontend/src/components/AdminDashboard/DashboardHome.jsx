import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { NavLink, Routes, Route, Navigate, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const handleLogout = () => {
    // Clear user session or token here if needed
    // Redirect to login page or home page
  };

  // Check if the current path matches the given path
  const isActive = (path) => {
    return location.pathname === path;
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
      
      {/* Main Content */}
      <div style={{
        marginLeft: collapsed ? '80px' : '250px',
        width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 250px)',
        transition: 'margin-left 0.3s, width 0.3s',
        padding: '20px'
      }}>
        <Container>
          {/* Different content based on routes */}
          <Routes>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<ManageUsers />} />
            <Route path="/admin/books" element={<ManageBooks />} />
            <Route path="/admin/categories" element={<ManageCategories />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/reports" element={<Reports />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
};

// Individual components for each section
const ManageUsers = () => (
  <div>
    <h2>Manage Users</h2>
    <p>This section allows you to view, add, edit, and delete users.</p>
    {/* Add user management functionality here */}
    <div className="mt-4">
      <Button variant="primary" className="me-2">Add New User</Button>
      <Button variant="info" className="me-2">Export Users</Button>
    </div>
    <div className="mt-4 p-3 border rounded">
      <h4>User List</h4>
      <p>The user list would be displayed here...</p>
    </div>
  </div>
);

const ManageBooks = () => (
  <div>
    <h2>Manage Books</h2>
    <p>Add, edit, delete, and manage your book inventory here.</p>
    {/* Add book management functionality here */}
    <div className="mt-4">
      <Button variant="primary" className="me-2">Add New Book</Button>
      <Button variant="info" className="me-2">Import Books</Button>
    </div>
    <div className="mt-4 p-3 border rounded">
      <h4>Book Inventory</h4>
      <p>The book inventory would be displayed here...</p>
    </div>
  </div>
);

const ManageCategories = () => (
  <div>
    <h2>Manage Categories</h2>
    <p>Create and organize book categories for better organization.</p>
    {/* Add category management functionality here */}
    <div className="mt-4 p-3 border rounded">
      <h4>Category List</h4>
      <p>Categories would be displayed here...</p>
    </div>
  </div>
);

const ManageOrders = () => (
  <div>
    <h2>Order Management</h2>
    <p>View and process customer orders.</p>
    {/* Add order management functionality here */}
    <div className="mt-4 p-3 border rounded">
      <h4>Recent Orders</h4>
      <p>Orders would be displayed here...</p>
    </div>
  </div>
);

const Reports = () => (
  <div>
    <h2>Analytics & Reports</h2>
    <p>View sales analytics and generate reports.</p>
    {/* Add reporting functionality here */}
    <div className="mt-4 p-3 border rounded">
      <h4>Sales Overview</h4>
      <p>Reports and charts would be displayed here...</p>
    </div>
  </div>
);

export default AdminDashboard;